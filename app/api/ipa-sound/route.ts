import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const IPA_SOUNDS_DIR = "public/ipa-sounds";

/** 请求 ASCII 文件名时，若不存在则尝试的 Unicode 文件名（避免用户未重命名时仍能播放） */
const FALLBACK_FILES: Record<string, string> = {
  "g.m4a": "ɡ.m4a",
  "dh.m4a": "ð.m4a",
};

function isSafeFileName(file: string): boolean {
  return /^[a-zA-Z0-9_.\-\u00C0-\u024F\u0260-\u02AF\u0370-\u03FF]+\.m4a$/.test(file) && !file.includes("..");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = (searchParams.get("file") || "").trim();
    if (!file || !isSafeFileName(file)) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const baseDir = join(process.cwd(), IPA_SOUNDS_DIR);
    const tryPaths: string[] = [join(baseDir, file)];
    const fallback = FALLBACK_FILES[file];
    if (fallback) {
      tryPaths.push(join(baseDir, fallback));
    }

    for (const filePath of tryPaths) {
      try {
        const buf = await readFile(filePath);
        return new NextResponse(buf, {
          headers: {
            "Content-Type": "audio/mp4",
            "Cache-Control": "public, max-age=86400",
          },
        });
      } catch {
        continue;
      }
    }

    return new NextResponse("Not found", { status: 404 });
  } catch (err) {
    console.error("ipa-sound api error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
