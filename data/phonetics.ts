/**
 * 音标参考：20 个元音 + 28 个辅音，用于「音标」Tab 展示与点击播放。
 * 配色：元音 单元音=绿、双元音=橙；辅音 清=蓝、浊=紫。
 */

export type VowelKind = "monophthong" | "diphthong";
export type ConsonantKind = "voiceless" | "voiced";

export interface PhonemeItem {
  ipa: string;
  exampleWord?: string; // 点击时用于 TTS 播放
}

// 元音：前/中/后/开合双元音/集中双元音
export const vowelCategories: { label: string; kind: VowelKind; phonemes: PhonemeItem[] }[] = [
  {
    label: "前元音",
    kind: "monophthong",
    phonemes: [
      { ipa: "iː", exampleWord: "see" },
      { ipa: "ɪ", exampleWord: "sit" },
      { ipa: "e", exampleWord: "bed" },
      { ipa: "æ", exampleWord: "cat" },
    ],
  },
  {
    label: "中元音",
    kind: "monophthong",
    phonemes: [
      { ipa: "ɜː", exampleWord: "bird" },
      { ipa: "ə", exampleWord: "about" },
      { ipa: "ʌ", exampleWord: "cup" },
    ],
  },
  {
    label: "后元音",
    kind: "monophthong",
    phonemes: [
      { ipa: "uː", exampleWord: "food" },
      { ipa: "ʊ", exampleWord: "book" },
      { ipa: "ɔː", exampleWord: "saw" },
      { ipa: "ɒ", exampleWord: "hot" },
      { ipa: "ɑː", exampleWord: "car" },
    ],
  },
  {
    label: "开合双元音",
    kind: "diphthong",
    phonemes: [
      { ipa: "eɪ", exampleWord: "day" },
      { ipa: "aɪ", exampleWord: "my" },
      { ipa: "ɔɪ", exampleWord: "boy" },
      { ipa: "aʊ", exampleWord: "now" },
      { ipa: "əʊ", exampleWord: "go" },
    ],
  },
  {
    label: "集中双元音",
    kind: "diphthong",
    phonemes: [
      { ipa: "ɪə", exampleWord: "near" },
      { ipa: "eə", exampleWord: "hair" },
      { ipa: "ʊə", exampleWord: "pure" },
    ],
  },
];

// 辅音：爆破/摩擦/破擦/鼻/舌边
export const consonantCategories: {
  label: string;
  phonemes: { ipa: string; kind: ConsonantKind; exampleWord?: string }[];
}[] = [
  {
    label: "爆破音",
    phonemes: [
      { ipa: "p", kind: "voiceless", exampleWord: "pat" },
      { ipa: "t", kind: "voiceless", exampleWord: "ten" },
      { ipa: "k", kind: "voiceless", exampleWord: "cat" },
      { ipa: "b", kind: "voiced", exampleWord: "bat" },
      { ipa: "d", kind: "voiced", exampleWord: "den" },
      { ipa: "ɡ", kind: "voiced", exampleWord: "go" },
    ],
  },
  {
    label: "摩擦音",
    phonemes: [
      { ipa: "f", kind: "voiceless", exampleWord: "fine" },
      { ipa: "s", kind: "voiceless", exampleWord: "see" },
      { ipa: "ʃ", kind: "voiceless", exampleWord: "ship" },
      { ipa: "θ", kind: "voiceless", exampleWord: "think" },
      { ipa: "h", kind: "voiceless", exampleWord: "hat" },
      { ipa: "v", kind: "voiced", exampleWord: "van" },
      { ipa: "z", kind: "voiced", exampleWord: "zip" },
      { ipa: "ʒ", kind: "voiced", exampleWord: "vision" },
      { ipa: "ð", kind: "voiced", exampleWord: "this" },
      { ipa: "r", kind: "voiced", exampleWord: "red" },
    ],
  },
  {
    label: "破擦音",
    phonemes: [
      { ipa: "tʃ", kind: "voiceless", exampleWord: "chip" },
      { ipa: "tr", kind: "voiceless", exampleWord: "tree" },
      { ipa: "ts", kind: "voiceless", exampleWord: "cats" },
      { ipa: "dʒ", kind: "voiced", exampleWord: "job" },
      { ipa: "dr", kind: "voiced", exampleWord: "draw" },
      { ipa: "dz", kind: "voiced", exampleWord: "beds" },
    ],
  },
  {
    label: "鼻辅音",
    phonemes: [
      { ipa: "m", kind: "voiced", exampleWord: "me" },
      { ipa: "n", kind: "voiced", exampleWord: "no" },
      { ipa: "ŋ", kind: "voiced", exampleWord: "sing" },
    ],
  },
  {
    label: "舌边音",
    phonemes: [{ ipa: "l", kind: "voiced", exampleWord: "light" }],
  },
  {
    label: "半元音",
    phonemes: [
      { ipa: "j", kind: "voiced", exampleWord: "yes" },
      { ipa: "w", kind: "voiced", exampleWord: "we" },
    ],
  },
];
