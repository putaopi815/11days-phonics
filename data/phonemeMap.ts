// data/phonemeMap.ts
// 音素映射表（不分英/美），Commons fileTitle 已在线核对
export type PhonemeAsset =
  | { kind: "single"; fileTitle: string } // 单音素：直接播一个 Commons 文件
  | { kind: "sequence"; ipa: string[]; gapMs?: number }; // 连缀/双元音：按顺序播多个音素

export const PHONEME_ASSETS: Record<string, PhonemeAsset> = {
  // ====== 单元音 ======
  "iː": { kind: "single", fileTitle: "File:Close front unrounded vowel.ogg" },
  "ɪ": { kind: "single", fileTitle: "File:Near-close near-frontal unrounded vowel (ɪ).ogg" },
  "e": { kind: "single", fileTitle: "File:Open-mid front unrounded vowel(ɛ).ogg" },
  "æ": { kind: "single", fileTitle: "File:Near-open frontal unrounded vowel (æ).ogg" },

  "ɜː": { kind: "single", fileTitle: "File:Open-mid central unrounded vowel.ogg" },
  "ə": { kind: "single", fileTitle: "File:Mid central vowel.ogg" },
  "ʌ": { kind: "single", fileTitle: "File:Open-mid back unrounded vowel (ʌ).ogg" },
  "ɒ": { kind: "single", fileTitle: "File:Open back rounded vowel.ogg" },
  "ɑː": { kind: "single", fileTitle: "File:Open back unrounded vowel.ogg" },

  "uː": { kind: "single", fileTitle: "File:Close back rounded vowel.ogg" },
  "ʊ": { kind: "single", fileTitle: "File:Near-close near-back rounded vowel.ogg" },
  "ɔː": { kind: "single", fileTitle: "File:Open-mid back rounded vowel.ogg" },

  // ====== 双元音（序列播放）======
  "eɪ": { kind: "sequence", ipa: ["e", "ɪ"], gapMs: 60 },
  "aɪ": { kind: "sequence", ipa: ["ɑː", "ɪ"], gapMs: 60 },
  "ɔɪ": { kind: "sequence", ipa: ["ɔː", "ɪ"], gapMs: 60 },
  "aʊ": { kind: "sequence", ipa: ["ɑː", "ʊ"], gapMs: 60 },
  "əʊ": { kind: "sequence", ipa: ["ə", "ʊ"], gapMs: 60 },

  "ɪə": { kind: "sequence", ipa: ["ɪ", "ə"], gapMs: 60 },
  "eə": { kind: "sequence", ipa: ["e", "ə"], gapMs: 60 },
  "ʊə": { kind: "sequence", ipa: ["ʊ", "ə"], gapMs: 60 },

  // ====== 辅音：爆破音 ======
  "p": { kind: "single", fileTitle: "File:Voiceless bilabial plosive.ogg" },
  "t": { kind: "single", fileTitle: "File:Voiceless alveolar plosive.ogg" },
  "k": { kind: "single", fileTitle: "File:Voiceless velar plosive.ogg" },
  "b": { kind: "single", fileTitle: "File:Voiced bilabial plosive.ogg" },
  "d": { kind: "single", fileTitle: "File:Voiced alveolar plosive.ogg" },
  "g": { kind: "single", fileTitle: "File:Voiced velar plosive.ogg" },

  // ====== 摩擦音 ======
  "f": { kind: "single", fileTitle: "File:Voiceless labio-dental fricative.ogg" },
  "v": { kind: "single", fileTitle: "File:Voiced labio-dental fricative.ogg" },
  "s": { kind: "single", fileTitle: "File:Voiceless alveolar sibilant.ogg" },
  "z": { kind: "single", fileTitle: "File:Voiced alveolar sibilant.ogg" },
  "ʃ": { kind: "single", fileTitle: "File:Voiceless palato-alveolar sibilant.ogg" },
  "ʒ": { kind: "single", fileTitle: "File:Voiced palato-alveolar sibilant.ogg" },
  "θ": { kind: "single", fileTitle: "File:Voiceless dental fricative.ogg" },
  "ð": { kind: "single", fileTitle: "File:Voiced dental fricative.ogg" },
  "h": { kind: "single", fileTitle: "File:Voiceless glottal fricative.ogg" },

  // ====== 破擦音 ======
  "tʃ": { kind: "single", fileTitle: "File:Voiceless palato-alveolar affricate.ogg" },
  "dʒ": { kind: "single", fileTitle: "File:Voiced palato-alveolar affricate.ogg" },
  "ts": { kind: "single", fileTitle: "File:Voiceless alveolar affricate.ogg" },
  "dz": { kind: "single", fileTitle: "File:Voiced alveolar affricate.ogg" },

  // ====== 鼻音/边音/半元音 ======
  "m": { kind: "single", fileTitle: "File:Bilabial nasal.ogg" },
  "n": { kind: "single", fileTitle: "File:Alveolar nasal.ogg" },
  "ŋ": { kind: "single", fileTitle: "File:Velar nasal.ogg" },
  "l": { kind: "single", fileTitle: "File:Alveolar lateral approximant.ogg" },
  "r": { kind: "single", fileTitle: "File:Alveolar approximant.ogg" },
  "j": { kind: "single", fileTitle: "File:Palatal approximant.ogg" },
  "w": { kind: "single", fileTitle: "File:Labio-velar approximant.ogg" },

  // ====== tr/dr 连缀 ======
  "tr": { kind: "sequence", ipa: ["t", "r"], gapMs: 40 },
  "dr": { kind: "sequence", ipa: ["d", "r"], gapMs: 40 },
};
