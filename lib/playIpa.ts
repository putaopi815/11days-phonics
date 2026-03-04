// lib/playIpa.ts
import { IPA_ASSETS, soundUrl, type IpaAsset } from "../data/ipaSoundMap";

function normalizeIpa(raw: string) {
  return raw.trim().replaceAll("/", "").replace(/ɡ/g, "g");
}

/** 播放单个 URL，在「播完」后再 resolve，便于 sequence 无缝衔接 */
function playUrlUntilEnd(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("play failed"));
    audio.play().catch(reject);
  });
}

export async function playIpa(ipaRaw: string) {
  const ipa = normalizeIpa(ipaRaw);

  const asset: IpaAsset | undefined = IPA_ASSETS[ipa];
  if (!asset) {
    throw new Error(`No IPA asset mapping for: ${ipa}`);
  }

  if (asset.kind === "single") {
    await playUrlUntilEnd(soundUrl(asset.file));
    return;
  }

  const gapMs = asset.gapMs ?? 40;
  for (let i = 0; i < asset.ipa.length; i++) {
    await playIpa(asset.ipa[i]);
    if (i < asset.ipa.length - 1) {
      await new Promise((r) => setTimeout(r, gapMs));
    }
  }
}
