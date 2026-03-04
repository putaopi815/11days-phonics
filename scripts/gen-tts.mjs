#!/usr/bin/env node
/**
 * 批量生成单词读音音频（OpenAI TTS）
 * 输入: data/words.txt  输出: public/word-audio/<safeWord>.mp3 + mapping.json
 * 运行: node scripts/gen-tts.mjs  需在 .env.local 设置 OPENAI_API_KEY
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function log(...args) {
  console.log(...args);
  if (process.stdout.isTTY === false) process.stdout.write("");
}

/** 若存在 .env.local 则加载到 process.env（不引入 dotenv 依赖） */
async function loadEnvLocal() {
  const p = path.join(ROOT, ".env.local");
  try {
    const content = await fs.readFile(p, "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && !m[1].startsWith("#")) {
        const val = m[2].replace(/^["']|["']$/g, "").trim();
        if (!process.env[m[1]]) process.env[m[1]] = val;
      }
    }
  } catch (_) {}
}
const WORDS_FILE = path.join(ROOT, "data", "words.txt");
const OUT_DIR = path.join(ROOT, "public", "word-audio");
const LOG_FAILED = path.join(ROOT, "logs", "tts_failed.txt");
const MAX_RETRIES = 2;

/** 文件名安全：小写、仅保留 a-z 0-9 ' -，其它替为 _，合并连续 _，去掉末尾 _ */
function toSafeWord(raw) {
  let s = raw
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  return s || "word";
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function loadWords() {
  const content = await fs.readFile(WORDS_FILE, "utf-8");
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const seen = new Map();
  for (const line of lines) {
    const key = line.toLowerCase();
    if (!seen.has(key)) seen.set(key, line);
  }
  return Array.from(seen.entries()).map(([key, original]) => ({ key, original }));
}

async function generateOne(client, word, outPath) {
  const response = await client.audio.speech.create({
    model: "tts-1-hd",
    voice: "cedar",
    input: word,
    response_format: "mp3",
    speed: 1.0,
  });
  const blob = await response.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  await fs.writeFile(outPath, buffer);
}

async function main() {
  log("gen-tts 启动，读取配置与词表...");
  await loadEnvLocal();
  if (process.env.SKIP_TLS_VERIFY === "1" || process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    log("已跳过 TLS 证书校验（仅限本地）");
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("缺少 OPENAI_API_KEY。请复制 .env.local.example 为 .env.local 并填入 key。");
    process.exit(1);
  }
  log("OPENAI_API_KEY 已加载（前 12 位: " + apiKey.slice(0, 12) + "...）");
  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxyUrl) log("使用代理: " + proxyUrl);

  await ensureDir(OUT_DIR);
  await ensureDir(path.dirname(LOG_FAILED));

  let words;
  try {
    words = await loadWords();
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error("未找到 data/words.txt，请先创建该文件，每行一个单词。");
      process.exit(1);
    }
    throw e;
  }

  const total = words.length;
  log("共 " + total + " 个词，开始请求 TTS API...\n");
  const mapping = {};
  const failed = [];

  const clientOptions = { apiKey, timeout: 60000 };
  if (proxyUrl) {
    const agent = proxyUrl.startsWith("socks")
      ? new SocksProxyAgent(proxyUrl)
      : new HttpsProxyAgent(proxyUrl);
    clientOptions.httpAgent = agent;
    clientOptions.httpsAgent = agent;
  }
  const client = new OpenAI(clientOptions);

  for (let i = 0; i < words.length; i++) {
    const { key, original } = words[i];
    const safe = toSafeWord(original);
    const filename = `${safe}.mp3`;
    const outPath = path.join(OUT_DIR, filename);
    const n = i + 1;

    try {
      const exists = await fs.access(outPath).then(() => true).catch(() => false);
      if (exists) {
        log(`[${n}/${total}] 跳过（已存在）: ${original} -> ${filename}`);
        mapping[key] = filename;
        continue;
      }

      let lastErr;
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          log(`[${n}/${total}] 请求 TTS: "${original}" ...`);
          await generateOne(client, original, outPath);
          log(`[${n}/${total}] 生成: ${original} -> ${filename}`);
          mapping[key] = filename;
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
          const msg = err?.message ?? String(err);
          const extra = err?.error?.message ?? err?.status ?? "";
          if (attempt < MAX_RETRIES) {
            log(`[${n}/${total}] ${original} 失败，重试 ${attempt + 1}/${MAX_RETRIES}: ${msg} ${extra}`);
          } else {
            console.error(`[${n}/${total}] 失败: ${original}`, msg, extra || "");
          }
        }
      }
      if (lastErr) {
        const msg = lastErr?.message ?? String(lastErr);
        failed.push({ word: original, error: msg });
      }
    } catch (e) {
      const msg = e?.message ?? String(e);
      console.error(`[${n}/${total}] 失败: ${original}`, msg);
      failed.push({ word: original, error: msg });
    }
  }

  await fs.writeFile(
    path.join(OUT_DIR, "mapping.json"),
    JSON.stringify(mapping, null, 2),
    "utf-8"
  );
  log("已写入 public/word-audio/mapping.json");

  if (failed.length > 0) {
    const logLines = failed.map(({ word, error }) => `${word}\t${error}`);
    await fs.writeFile(LOG_FAILED, logLines.join("\n") + "\n", "utf-8");
    console.error("失败 " + failed.length + " 个，已记录到 logs/tts_failed.txt");
  } else {
    log("全部完成。");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
