const ACCENT_KEY = "phonics-14-accent";

export type Accent = "en-GB" | "en-US";

export function getAccent(): Accent {
  if (typeof window === "undefined") return "en-GB";
  const stored = localStorage.getItem(ACCENT_KEY);
  if (stored === "en-US" || stored === "en-GB") return stored;
  return "en-GB";
}

export function setAccent(accent: Accent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCENT_KEY, accent);
}
