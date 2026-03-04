import Link from "next/link";

export default function Home() {
  return (
    <div className="appViewport" style={{ padding: 24, display: "grid", placeItems: "center", minHeight: "100dvh" }}>
      <p className="bodyText">正在跳转到今日学习…</p>
      <Link href="/today" className="primaryButton" style={{ marginTop: 16 }}>
        前往今天
      </Link>
    </div>
  );
}