// scripts/gen-tts-macos.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const PROJECT_ROOT = process.cwd();
const WORDS_FILE = path.join(PROJECT_ROOT, "data/words.txt");
const OUT_DIR = path.join(PROJECT_ROOT, "public/word-audio");
const TMP_DIR = path.join(PROJECT_ROOT, "logs/tmp-tts");
const FAILED_FILE = path.join(PROJECT_ROOT, "logs/tts_failed.txt");
const MAPPING_FILE = path.join(OUT_DIR, "mapping.json");

// 选一个你本机存在的 voice（先 say -v '?' 看列表）
const VOICE = "Samantha";
// 语速：每分钟多少词，越大越快（可改 160/180/200）
const RATE = "180";

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(FAILED_FILE), { recursive: true });
fs.mkdirSync(TMP_DIR, { recursive: true });

function safeName(word) {
  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9'-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/_$/g, "");
}

const raw = fs.readFileSync(WORDS_FILE, "utf8");
const list = raw
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

const uniq = new Map(); // lower -> original
for (const w of list) {
  const k = w.toLowerCase();
  if (!uniq.has(k)) uniq.set(k, w);
}

const mapping = {};

let i = 0;
const total = uniq.size;

for (const [lower, word] of uniq.entries()) {
  i += 1;
  const base = safeName(word);
  const outAIFF = path.join(OUT_DIR, `${base}.aiff`);
  mapping[word] = `${base}.aiff`;

  if (fs.existsSync(outAIFF)) {
    console.log(`[${i}/${total}] skip: ${word}`);
    continue;
  }

  console.log(`[${i}/${total}] gen: ${word}`);

  const tmpAiff = path.join(TMP_DIR, `${base}.aiff`);
  try {
    execFileSync("say", ["-v", VOICE, "-r", RATE, "-o", tmpAiff, word], {
      stdio: "ignore",
    });
    fs.copyFileSync(tmpAiff, outAIFF);
  } catch (e) {
    fs.appendFileSync(FAILED_FILE, `${word}\n`);
    console.log(`  failed: ${word}`);
  } finally {
    try { fs.unlinkSync(tmpAiff); } catch {}
  }
}

fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), "utf8");
console.log("done ->", OUT_DIR);
