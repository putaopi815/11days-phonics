import { NextResponse } from "next/server";
import { PHONEME_ASSETS } from "../../../data/phonemeMap";

async function fetchCommons(fileTitle: string) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    titles: fileTitle,
    prop: "imageinfo",
    iiprop: "url|extmetadata",
  });
  const u = `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
  const res = await fetch(u, { headers: { "User-Agent": "phonics-14-demo" } });
  const json = await res.json();

  const pages = json?.query?.pages;
  const page = pages ? pages[Object.keys(pages)[0]] : null;
  const info = page?.imageinfo?.[0];
  if (!info) return { audioUrl: null, attribution: null };

  const meta = info.extmetadata || {};
  return {
    audioUrl: info.url ?? null,
    attribution: {
      fileTitle,
      filePageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`,
      author: meta.Artist?.value || meta.Author?.value,
      licenseShort: meta.LicenseShortName?.value,
      licenseUrl: meta.LicenseUrl?.value,
      attributionRequired: meta.AttributionRequired?.value === "true",
    },
  };
}

// 将 ASCII 长音符号 : 规范为 Unicode 长音符 ː，便于与 phonemeMap 的 key 一致
function normalizeIpa(ipa: string): string {
  return ipa
    .replace(/^\/|\/$/g, "")
    .replace(/ɡ/g, "g")
    .replace(/:/g, "\u02D0"); // U+02D0 MODIFIER LETTER TRIANGULAR COLON (IPA long)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let ipa = (searchParams.get("ipa") || "").trim();
    ipa = normalizeIpa(ipa);

    const asset = PHONEME_ASSETS[ipa];
    if (!asset) {
      return NextResponse.json({
        error: "unknown ipa",
        audioUrl: null,
        attribution: null,
      });
    }

    if (asset.kind === "single") {
      const { audioUrl, attribution } = await fetchCommons(asset.fileTitle);
      return NextResponse.json({ audioUrl, attribution, error: null });
    }

    // sequence：前端依次请求每个 ipa 并按 gapMs 播放，后端只返回序列
    return NextResponse.json({
      sequence: asset.ipa,
      gapMs: asset.gapMs ?? 60,
      error: null,
    });
  } catch (err: unknown) {
    console.error("phoneme api error:", err);
    return NextResponse.json(
      {
        audioUrl: null,
        attribution: null,
        error: String(err instanceof Error ? err.message : err),
      },
      { status: 200 },
    );
  }
}
