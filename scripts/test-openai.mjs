#!/usr/bin/env node
/**
 * 快速测试 OPENAI_API_KEY 和 TTS 是否可用
 * 运行: cd design/phonics-14 && node scripts/test-openai.mjs
 * 代理: 在 .env.local 设置 HTTPS_PROXY 或 HTTP_PROXY
 *   - HTTP 代理: http://127.0.0.1:7890
 *   - SOCKS5（若 HTTP 报错可试）: socks5://127.0.0.1:7890 或 socks5://127.0.0.1:7891
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const envPath = path.join(ROOT, ".env.local");

async function loadEnv() {
  try {
    const content = await fs.readFile(envPath, "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (m && !m[1].startsWith("#")) {
        const val = m[2].replace(/^["']|["']$/g, "").trim();
        if (!process.env[m[1]]) process.env[m[1]] = val;
      }
    }
  } catch (_) {}
}

async function main() {
  await loadEnv();
  if (process.env.SKIP_TLS_VERIFY === "1" || process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    console.log("已跳过 TLS 证书校验（仅限本地，解决 unable to get local issuer certificate）");
  }
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.log("未找到 OPENAI_API_KEY（.env.local）");
    process.exit(1);
  }
  console.log("OPENAI_API_KEY 已加载，前 12 位:", key.slice(0, 12) + "...\n");

  const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (proxyUrl) console.log("使用代理:", proxyUrl);

  const TIMEOUT_MS = 60000;
  const clientOptions = { apiKey: key, timeout: TIMEOUT_MS };
  if (proxyUrl) {
    const agent = proxyUrl.startsWith("socks")
      ? new SocksProxyAgent(proxyUrl)
      : new HttpsProxyAgent(proxyUrl);
    clientOptions.httpAgent = agent;
    clientOptions.httpsAgent = agent;
  }
  const client = new OpenAI(clientOptions);

  console.log("正在请求 models.list()（最多等 " + TIMEOUT_MS / 1000 + " 秒）...");
  try {
    const list = await Promise.race([
      client.models.list(),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error("请求超时（" + TIMEOUT_MS / 1000 + "s）。若在国内请配置代理或使用可访问 OpenAI 的网络。")), TIMEOUT_MS)
      ),
    ]);
    console.log("models.list() 成功，模型数量:", list.data?.length ?? 0);
  } catch (e) {
    console.log("models.list 失败:", e.message);
    if (e.code) console.log("  错误码:", e.code, "(ECONNREFUSED=代理未连上，可试 SOCKS5: socks5://127.0.0.1:7890)");
    if (e.cause) console.log("  原因:", e.cause?.message ?? e.cause);
  }

  console.log("\n正在请求 TTS（单词 see）...");
  try {
    const res = await Promise.race([
      client.audio.speech.create({
        model: "tts-1-hd",
        voice: "cedar",
        input: "see",
        response_format: "mp3",
        speed: 1.0,
      }),
      new Promise((_, rej) =>
        setTimeout(() => rej(new Error("TTS 请求超时，请检查网络或代理。")), TIMEOUT_MS)
      ),
    ]);
    const blob = await res.blob();
    const out = path.join(ROOT, "public", "word-audio", "see.mp3");
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, Buffer.from(await blob.arrayBuffer()));
    console.log("TTS 成功，已写入 public/word-audio/see.mp3");
  } catch (e) {
    console.log("TTS 失败:", e.message);
    if (e.code) console.log("  错误码:", e.code);
    if (e.cause) console.log("  原因:", e.cause?.message ?? e.cause);
    if (e.error) console.log("  error:", e.error);
    process.exit(1);
  }
}

main();
