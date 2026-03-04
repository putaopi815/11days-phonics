#!/usr/bin/env node
/**
 * 将「按顺序命名」的 .m4a 文件复制并重命名为音标文件名，放入 public/ipa-sounds/
 *
 * 用法：
 * 1. 把你的 46 个 .m4a 按下面顺序命名为 01.m4a, 02.m4a, ..., 46.m4a，放进一个文件夹（如 ./my-ipa-m4a）
 * 2. 运行：node scripts/copy-ipa-sounds.js ./my-ipa-m4a
 *
 * 顺序（与 data/ipa-audio-filenames.md 一致）：
 * 元音 1-20：iː ɪ e æ ɜː ə ʌ uː ʊ ɔː ɒ ɑː eɪ aɪ ɔɪ aʊ əʊ ɪə eə ʊə
 * 辅音 21-46：p t k b d ɡ f s ʃ θ h v z ʒ ð r tʃ tr ts dʒ dr dz m n ŋ l
 */

const fs = require("fs");
const path = require("path");

const TARGET_NAMES = [
  "iː", "ɪ", "e", "æ", "ɜː", "ə", "ʌ", "uː", "ʊ", "ɔː", "ɒ", "ɑː",
  "eɪ", "aɪ", "ɔɪ", "aʊ", "əʊ", "ɪə", "eə", "ʊə",
  "p", "t", "k", "b", "d", "ɡ", "f", "s", "ʃ", "θ", "h", "v", "z", "ʒ", "ð", "r",
  "tʃ", "tr", "ts", "dʒ", "dr", "dz", "m", "n", "ŋ", "l",
];

const sourceDir = process.argv[2];
if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error("用法: node scripts/copy-ipa-sounds.js <源文件夹路径>");
  console.error("示例: node scripts/copy-ipa-sounds.js ./my-ipa-m4a");
  console.error("");
  console.error("请将 46 个 .m4a 按顺序命名为 01.m4a, 02.m4a, ..., 46.m4a 放入源文件夹。");
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, "..");
const outDir = path.join(projectRoot, "public", "ipa-sounds");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const ext = ".m4a";
let copied = 0;
for (let i = 0; i < TARGET_NAMES.length; i++) {
  const num = String(i + 1).padStart(2, "0");
  const targetName = TARGET_NAMES[i] + ext;
  const possibleSources = [
    path.join(sourceDir, `${num}${ext}`),
    path.join(sourceDir, `${num}.m4a`),
    path.join(sourceDir, targetName),
  ];
  let src = possibleSources.find((p) => fs.existsSync(p));
  if (!src) {
    console.warn(`跳过 ${targetName}：未找到 0${i + 1}.m4a 或 ${targetName}`);
    continue;
  }
  const dest = path.join(outDir, targetName);
  fs.copyFileSync(src, dest);
  console.log(`${path.basename(src)} -> ${targetName}`);
  copied++;
}

console.log(`\n完成：已复制 ${copied}/${TARGET_NAMES.length} 个文件到 public/ipa-sounds/`);
