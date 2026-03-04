import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "11天自然拼读速成",
  manifest: "/manifest.json",
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
