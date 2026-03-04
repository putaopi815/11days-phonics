"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ATTRIBUTION_STORAGE_KEY = "phonics_attributions_v1";

type Attribution = {
  fileTitle?: string;
  filePageUrl?: string;
  author?: string;
  licenseShort?: string;
  licenseUrl?: string;
  attributionRequired?: boolean;
};

export default function CreditsPage() {
  const [list, setList] = useState<Attribution[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
      const data = raw ? (JSON.parse(raw) as Attribution[]) : [];
      setList(Array.isArray(data) ? data : []);
    } catch {
      setList([]);
    }
  }, []);

  return (
    <div className="appViewport">
      <header className="pageHeader">
        <Link href="/me" className="bodyText" style={{ marginBottom: 8 }}>
          ← 返回我的
        </Link>
        <h1>鸣谢与许可</h1>
        <p className="bodyText">
          以下为播放单词/音素时使用的音频来源，依 CC BY / CC BY-SA 等许可要求署名。
        </p>
      </header>

      <main className="pageContent">
        {list.length === 0 ? (
          <section className="card">
            <p className="bodyText">暂无已使用的音频记录。使用「今天」或「音标」页播放单词/音素后，此处会列出对应来源与许可信息。</p>
          </section>
        ) : (
          <ul className="courseList" style={{ listStyle: "none" }}>
            {list.map((item, i) => (
              <li key={item?.fileTitle ?? i} className="card">
                <div className="listRow">
                  <strong>{item?.fileTitle ?? "—"}</strong>
                </div>
                {item?.filePageUrl && (
                  <p className="bodyText">
                    <a
                      href={item.filePageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="metaText"
                    >
                      {item.filePageUrl}
                    </a>
                  </p>
                )}
                {item?.author && (
                  <p className="bodyText">作者 / Author: {item.author}</p>
                )}
                {item?.licenseShort && (
                  <p className="bodyText">
                    许可 / License: {item.licenseShort}
                    {item?.licenseUrl && (
                      <>
                        {" · "}
                        <a
                          href={item.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="metaText"
                        >
                          链接
                        </a>
                      </>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
