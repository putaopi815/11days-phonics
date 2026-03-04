"use client";

import type { ReactNode } from "react";
import { LearningStoreProvider } from "../lib/store";

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <LearningStoreProvider>
      <div className="appViewport">
        <header className="pageHeader">
          <h1>{title}</h1>
          {subtitle ? <p className="bodyText">{subtitle}</p> : null}
        </header>
        <main className="pageContent">{children}</main>
      </div>
    </LearningStoreProvider>
  );
}
