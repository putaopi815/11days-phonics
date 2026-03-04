"use client";

import Link from "next/link";

type TabKey = "today" | "phonetics" | "me";

/** 与 11天速成自然拼读.pen 中 Material Symbols Rounded 一致 */
const tabs: { key: TabKey; label: string; href: string; icon: string }[] = [
  { key: "today", label: "学习", href: "/today", icon: "today" },
  { key: "phonetics", label: "音标", href: "/phonetics", icon: "graphic_eq" },
  { key: "me", label: "我的", href: "/me", icon: "person" },
];

export function BottomTabs({ activeTab }: { activeTab: TabKey }) {
  return (
    <nav className="bottomTabs" aria-label="底部导航">
      <div className="tabPill">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={tab.key === activeTab ? "tabItem active" : "tabItem"}
          >
            <span className="tabIcon material-symbols-rounded" aria-hidden>
              {tab.icon}
            </span>
            <span className="tabLabel">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
