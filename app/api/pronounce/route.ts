import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/** 仅使用本地音频：若 public/word-audio/mapping.json 存在且包含该词，返回本地音频 URL，否则返回 null */
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const word = (searchParams.get("word") || "").trim();

    if (!word) {
      return NextResponse.json({ audioUrl: null, attribution: null, error: "missing word" });
    }

    const localUrl = getLocalWordAudioUrl(word);
    if (localUrl) {
      return NextResponse.json({ audioUrl: localUrl, attribution: null, error: null });
    }

    return NextResponse.json({
      audioUrl: null,
      attribution: null,
      error: "no local audio for this word",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("pronounce api error:", err);
    return NextResponse.json({ audioUrl: null, attribution: null, error: message });
  }
}
