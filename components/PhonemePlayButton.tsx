"use client";

import { useRef } from "react";

const ATTRIBUTION_STORAGE_KEY = "phonics_attributions_v1";

type Attribution = {
  fileTitle?: string;
  filePageUrl?: string;
  author?: string;
  licenseShort?: string;
  licenseUrl?: string;
  [k: string]: unknown;
};

function saveAttribution(attribution: Attribution | null | undefined) {
  if (!attribution?.fileTitle || typeof window === "undefined") return;
  const list: Attribution[] = JSON.parse(
    localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "[]",
  );
  const next = [
    ...list.filter((x) => x?.fileTitle !== attribution.fileTitle),
    attribution,
  ];
  localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
}

function playAudioUrl(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.preload = "auto";
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("play failed"));
    audio.play().catch(reject);
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

interface PhonemePlayButtonProps {
  ipa: string;
  className?: string;
  children?: React.ReactNode;
  /** 若传入，点击时优先调用此回调（如本地 playIpa），不再走 API */
  onPlay?: (ipa: string) => void | Promise<void>;
}

export function PhonemePlayButton({
  ipa,
  className = "",
  children,
  onPlay,
}: PhonemePlayButtonProps) {
  const isPlayingRef = useRef(false);

  const handlePlay = async () => {
    if (typeof window === "undefined") return;
    const rawIpa = ipa.replace(/^\/|\/$/g, "").trim();
    if (!rawIpa) return;

    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    try {
      if (onPlay) {
        await onPlay(rawIpa);
        return;
      }

      const res = await fetch(
        `/api/phoneme?ipa=${encodeURIComponent(rawIpa)}`,
      );
      const data = (await res.json()) as {
        audioUrl?: string | null;
        attribution?: Attribution | null;
        sequence?: string[] | null;
        gapMs?: number;
        error?: string | null;
      };

      if (data?.error && !data?.audioUrl && !data?.sequence) return;

      if (data?.audioUrl) {
        await playAudioUrl(data.audioUrl);
        saveAttribution(data.attribution);
        return;
      }

      if (data?.sequence && Array.isArray(data.sequence) && data.sequence.length > 0) {
        const gapMs = data.gapMs ?? 60;
        for (let i = 0; i < data.sequence.length; i++) {
          const subRes = await fetch(
            `/api/phoneme?ipa=${encodeURIComponent(data.sequence[i])}`,
          );
          const subData = (await subRes.json()) as {
            audioUrl?: string | null;
            attribution?: Attribution | null;
            error?: string | null;
          };
          if (subData?.audioUrl) {
            await playAudioUrl(subData.audioUrl);
            saveAttribution(subData.attribution);
          }
          if (i < data.sequence.length - 1) await delay(gapMs);
        }
      }
    } catch {
      // 静默失败
    } finally {
      isPlayingRef.current = false;
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handlePlay}
    >
      {children ?? ipa}
    </button>
  );
}
