"use client";

import { LearningStoreProvider } from "../lib/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LearningStoreProvider>{children}</LearningStoreProvider>;
}
