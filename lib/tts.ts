import type { Accent } from "./storage";

function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      resolve(speechSynthesis.getVoices());
    };
  });
}

function findVoice(voices: SpeechSynthesisVoice[], lang: Accent): SpeechSynthesisVoice | null {
  const preferred = voices.find((v) => v.lang === lang);
  if (preferred) return preferred;
  const fallback = lang === "en-GB" ? "en-GB" : "en-US";
  return voices.find((v) => v.lang.startsWith(fallback)) ?? voices.find((v) => v.lang.startsWith("en")) ?? null;
}

export function speak(text: string, accent: Accent): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  getVoices().then((voices) => {
    const voice = findVoice(voices, accent);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = accent;
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  });
}
