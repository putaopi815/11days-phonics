"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Accent } from "./storage";
import { getAccent, setAccent as persistAccent } from "./storage";
import { speak as ttsSpeak } from "./tts";

type AudioContextValue = {
  accent: Accent;
  setAccent: (accent: Accent) => void;
  speak: (text: string) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("en-GB");

  useEffect(() => {
    setAccentState(getAccent());
  }, []);

  const setAccent = useCallback((value: Accent) => {
    persistAccent(value);
    setAccentState(value);
  }, []);

  const speak = useCallback(
    (text: string) => {
      ttsSpeak(text, accent);
    },
    [accent]
  );

  return (
    <AudioContext.Provider value={{ accent, setAccent, speak }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
