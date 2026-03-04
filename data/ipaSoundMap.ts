// data/ipaSoundMap.ts
// 音频文件名与「音标 Tab」一致，见 data/ipa-audio-filenames.md

export type IpaAsset =
  | { kind: "single"; file: string }
  | { kind: "sequence"; ipa: string[]; gapMs?: number };

/** 生产环境（Vercel）下 API 读 public 可能不可靠，g/dh 改为直接走静态路径，与其它音标一致 */
export function soundUrl(fileName: string) {
  return `/ipa-sounds/${encodeURIComponent(fileName)}`;
}

/** 每个音标对应一个文件：文件名 = 音标.m4a（与 ipa-audio-filenames.md 一致） */
export const IPA_ASSETS: Record<string, IpaAsset> = {
  // ===== 20 元音 =====
  "iː": { kind: "single", file: "iː.m4a" },
  "ɪ": { kind: "single", file: "ɪ.m4a" },
  "e": { kind: "single", file: "e.m4a" },
  "æ": { kind: "single", file: "æ.m4a" },
  "ɜː": { kind: "single", file: "ɜː.m4a" },
  "ə": { kind: "single", file: "ə.m4a" },
  "ʌ": { kind: "single", file: "ʌ.m4a" },
  "uː": { kind: "single", file: "uː.m4a" },
  "ʊ": { kind: "single", file: "ʊ.m4a" },
  "ɔː": { kind: "single", file: "ɔː.m4a" },
  "ɒ": { kind: "single", file: "ɒ.m4a" },
  "ɑː": { kind: "single", file: "ɑː.m4a" },
  "eɪ": { kind: "single", file: "eɪ.m4a" },
  "aɪ": { kind: "single", file: "aɪ.m4a" },
  "ɔɪ": { kind: "single", file: "ɔɪ.m4a" },
  "aʊ": { kind: "single", file: "aʊ.m4a" },
  "əʊ": { kind: "single", file: "əʊ.m4a" },
  "ɪə": { kind: "single", file: "ɪə.m4a" },
  "eə": { kind: "single", file: "eə.m4a" },
  "ʊə": { kind: "single", file: "ʊə.m4a" },

  // ===== 辅音 =====
  "p": { kind: "single", file: "p.m4a" },
  "t": { kind: "single", file: "t.m4a" },
  "k": { kind: "single", file: "k.m4a" },
  "b": { kind: "single", file: "b.m4a" },
  "d": { kind: "single", file: "d.m4a" },
  /** ɡ (U+0261) 与 ASCII g 均指向 g.m4a，避免 Unicode 文件名与 normalize 后查表失败 */
  "ɡ": { kind: "single", file: "g.m4a" },
  "g": { kind: "single", file: "g.m4a" },
  "f": { kind: "single", file: "f.m4a" },
  "s": { kind: "single", file: "s.m4a" },
  "ʃ": { kind: "single", file: "ʃ.m4a" },
  "θ": { kind: "single", file: "θ.m4a" },
  "h": { kind: "single", file: "h.m4a" },
  "v": { kind: "single", file: "v.m4a" },
  "z": { kind: "single", file: "z.m4a" },
  "ʒ": { kind: "single", file: "ʒ.m4a" },
  /** ð (eth) 使用 ASCII 文件名 dh.m4a，避免 Unicode 路径导致静态资源无法加载 */
  "ð": { kind: "single", file: "dh.m4a" },
  "r": { kind: "single", file: "r.m4a" },
  "tʃ": { kind: "single", file: "tʃ.m4a" },
  "tr": { kind: "single", file: "tr.m4a" },
  "ts": { kind: "single", file: "ts.m4a" },
  "dʒ": { kind: "single", file: "dʒ.m4a" },
  "dr": { kind: "single", file: "dr.m4a" },
  "dz": { kind: "single", file: "dz.m4a" },
  "m": { kind: "single", file: "m.m4a" },
  "n": { kind: "single", file: "n.m4a" },
  "ŋ": { kind: "single", file: "ŋ.m4a" },
  "l": { kind: "single", file: "l.m4a" },

  // ===== 半元音 =====
  /** 半元音 j 使用 y.m4a */
  "j": { kind: "single", file: "y.m4a" },
  "w": { kind: "single", file: "w.m4a" },
};
