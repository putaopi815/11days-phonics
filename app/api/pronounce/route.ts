import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

type Accent = "uk" | "us";

/** 若 public/word-audio/mapping.json 存在且包含该词，返回本地音频 URL */
function getLocalWordAudioUrl(word: string): string | null {
  const mappingPath = path.join(process.cwd(), "public", "word-audio", "mapping.json");
  try {
    if (!fs.existsSync(mappingPath)) return null;
    const raw = fs.readFileSync(mappingPath, "utf-8");
    const mapping: Record<string, string> = JSON.parse(raw);
    const key = word.trim();
    const filename = mapping[key] ?? mapping[key.toLowerCase()];
    if (filename) return `/word-audio/${filename}`;
  } catch {
    // ignore
  }
  return null;
}

type Attribution = {
  fileTitle: string; // File:xxx.ogg
  filePageUrl: string;
  author?: string;
  licenseShort?: string;
  licenseUrl?: string;
  attributionRequired?: boolean;
};

function pickByAccent(fileTitles: string[], accent: Accent) {
  const want = accent === "us" ? /(\bUS\b|_US_|-US-)/i : /(\bUK\b|_UK_|-UK-)/i;
  const hit = fileTitles.find((t) => want.test(t));
  return hit ?? fileTitles[0] ?? null;
}

async function fetchWiktionaryAudioFiles(word: string): Promise<string[]> {
  // 通过 MediaWiki API 找页面里引用的音频文件（ogg/mp3）
  const title = word.replaceAll(" ", "_");
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    titles: title,
    prop: "images",
    imlimit: "max",
  });

  const u = `https://en.wiktionary.org/w/api.php?${params.toString()}`;
  const res = await fetch(u, { headers: { "User-Agent": "phonics-14-demo" } });
  if (!res.ok) return [];

  const json = await res.json();
  const pages = json?.query?.pages;
  const page = pages ? pages[Object.keys(pages)[0]] : null;
  const images: Array<{ title: string }> = page?.images ?? [];

  // 过滤出音频文件
  return images
    .map((x) => x.title)
    .filter((t) => /^File:.*\.(ogg|mp3)$/i.test(t));
}

async function fetchCommonsAudioUrlAndAttribution(fileTitle: string): Promise<{ audioUrl: string | null; attribution: Attribution | null }> {
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
  if (!res.ok) return { audioUrl: null, attribution: null };

  const json = await res.json();
  const pages = json?.query?.pages;
  const page = pages ? pages[Object.keys(pages)[0]] : null;
  const info = page?.imageinfo?.[0];
  if (!info) return { audioUrl: null, attribution: null };

  const audioUrl: string | null = info.url ?? null;

  const meta = info.extmetadata || {};
  const author = meta.Artist?.value || meta.Author?.value;
  const licenseShort = meta.LicenseShortName?.value;
  const licenseUrl = meta.LicenseUrl?.value;
  const attributionRequired = meta.AttributionRequired?.value === "true";
  const filePageUrl = `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle)}`;

  const attribution: Attribution = {
    fileTitle,
    filePageUrl,
    author,
    licenseShort,
    licenseUrl,
    attributionRequired,
  };

  return { audioUrl, attribution };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const word = (searchParams.get("word") || "").trim();
    const accent = (searchParams.get("accent") || "uk") as Accent;

    if (!word) {
      return NextResponse.json({ audioUrl: null, attribution: null, error: "missing word" });
    }

    const localUrl = getLocalWordAudioUrl(word);
    if (localUrl) {
      return NextResponse.json({ audioUrl: localUrl, attribution: null, error: null });
    }

    const files = await fetchWiktionaryAudioFiles(word);
    if (!files.length) {
      return NextResponse.json({ audioUrl: null, attribution: null, error: "no audio files found via wiktionary api" });
    }

    const fileTitle = pickByAccent(files, accent);
    if (!fileTitle) {
      return NextResponse.json({ audioUrl: null, attribution: null, error: "no audio file selected" });
    }

    const { audioUrl, attribution } = await fetchCommonsAudioUrlAndAttribution(fileTitle);
    if (!audioUrl) {
      return NextResponse.json({ audioUrl: null, attribution, error: "commons did not return audio url" });
    }

    return NextResponse.json({ audioUrl, attribution, error: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("pronounce api error:", err);
    return NextResponse.json({ audioUrl: null, attribution: null, error: message });
  }
}
