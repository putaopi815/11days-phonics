// lib/audio.ts
import type { Accent } from "../types";
import { speak } from "./tts";

const accentToLang = (a: Accent): "en-GB" | "en-US" =>
  a === "uk" ? "en-GB" : "en-US";

/** 播放单词：真人单词音频优先（/api/pronounce），失败再 TTS */
export async function playWordAudio(word: string, accent: Accent) {
  try {
    const res = await fetch(
      `/api/pronounce?word=${encodeURIComponent(word)}&accent=${accent}`,
    );
    const data = await res.json();
    if (data?.audioUrl) {
      const audio = new Audio(data.audioUrl);
      await audio.play();
      return;
    }
  } catch {}
  speak(word, accentToLang(accent));
}

/** 规范化 IPA 字符串（与 API / 映射表一致） */
function normalizeIpaForLookup(ipa: string): string {
  return ipa.replace(/^\/|\/$/g, "").trim().replace(/ɡ/g, "g").replace(/:/g, "\u02D0");
}

/** 播放音素：走 /api/phoneme（单音素或序列），无音频时用 TTS 兜底 */
export async function playIpaAudio(ipa: string, accent?: Accent) {
  const rawIpa = normalizeIpaForLookup(ipa);
  const res = await fetch(
    `/api/phoneme?ipa=${encodeURIComponent(rawIpa)}`,
  );
  const data = await res.json();

  // 单音素：直接播
  if (data?.audioUrl) {
    const audio = new Audio(data.audioUrl);
    await audio.play();
    return;
  }

  // 序列（双元音 / tr dr）：依次播每个子音素
  if (Array.isArray(data?.sequence)) {
    const gapMs: number =
      typeof data.gapMs === "number" ? data.gapMs : 60;

    for (let i = 0; i < data.sequence.length; i++) {
      const unit = data.sequence[i];
      const r2 = await fetch(
        `/api/phoneme?ipa=${encodeURIComponent(unit)}`,
      );
      const d2 = await r2.json();

      if (d2?.audioUrl) {
        const a2 = new Audio(d2.audioUrl);
        await a2.play();
        await new Promise((r) => setTimeout(r, gapMs));
      }
    }
    return;
  }

  // 无在线音频时用 TTS 读近似词兜底，保证用户能听到声音
  if (accent) {
    playHintPhoneme(ipa, accent);
    return;
  }
  throw new Error("No phoneme audio");
}

/** TTS 近似提示（可选兜底）：用短词近似读该音素 */
const IPA_HINT_CUES: Record<string, string> = {
  "iː": "ee", "ɪ": "ih", "e": "eh", "æ": "a", "ɜː": "er", "ə": "uh", "ʌ": "uh",
  "uː": "oo", "ʊ": "u", "ɔː": "aw", "ɒ": "o", "ɑː": "ah",
  "eɪ": "ay", "aɪ": "eye", "ɔɪ": "oy", "aʊ": "ow", "əʊ": "oh",
  "ɪə": "ear", "eə": "air", "ʊə": "oor",
  "p": "p", "b": "b", "t": "t", "d": "d", "k": "k", "ɡ": "g",
  "f": "f", "v": "v", "s": "s", "z": "z", "ʃ": "sh", "ʒ": "zh", "θ": "th", "ð": "th",
  "h": "h", "r": "r", "tʃ": "ch", "dʒ": "j", "m": "m", "n": "n", "ŋ": "ng", "l": "l",
};

export function playHintPhoneme(ipa: string, accent: Accent) {
  const raw = normalizeIpaForLookup(ipa);
  const cue = IPA_HINT_CUES[raw] ?? raw;
  speak(cue, accentToLang(accent));
}
