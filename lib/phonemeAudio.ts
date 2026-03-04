// lib/phonemeAudio.ts
import type { Accent } from "../types";

// 先做最小映射：你当前用到的音素先覆盖（后面逐步补全）
const PHONEME_MAP: Record<string, { uk: string; us: string }> = {
  "/iː/": { uk: "/phonemes/uk/i-long.mp3", us: "/phonemes/us/i-long.mp3" },
  "/ɪ/": { uk: "/phonemes/uk/i-short.mp3", us: "/phonemes/us/i-short.mp3" },
  // ...后续继续加
};

export async function playPhonemeIPA(ipa: string, accent: Accent) {
  const item = PHONEME_MAP[ipa];
  if (!item) throw new Error(`No phoneme audio for ${ipa}`);

  const url = accent === "us" ? item.us : item.uk;
  const audio = new Audio(url);
  audio.preload = "auto";
  await audio.play();
}
