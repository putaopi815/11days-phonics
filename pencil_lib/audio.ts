import type { Accent } from "../types";

export async function playPhonemeAudio(
  phonemeIPA: string,
  accent: Accent,
  exampleWord?: string,
) {
  console.info("playPhonemeAudio stub", { phonemeIPA, accent, exampleWord });
}

export async function playWordAudio(word: string, accent: Accent) {
  console.info("playWordAudio stub", { word, accent });
}
