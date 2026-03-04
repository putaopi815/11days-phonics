"use client";

import { AudioButton } from "./AudioButton";
import type { DayPlan } from "../types";

interface StepCardProps {
  plan: DayPlan;
  completed: { step1Done: boolean; step2Done: boolean; step3Done: boolean };
  onCompleteStep: (step: 1 | 2 | 3) => void;
  onPlayPhoneme: () => void;
  onPlayWord: (word: string) => void;
  /** 为 false 时不可点完成（如查看非当天的内容） */
  canComplete?: boolean;
  /** 多音标时展示选择音标区块，与 stepBlock 同级放在卡片内；indexInPhonemes 为在完整 phonemes 中的下标 */
  phonemesForTabs?: { ipa: string; indexInPhonemes: number }[];
  activePhonemeIdx?: number;
  onSelectPhoneme?: (indexInPhonemes: number) => void;
}

function StepHeader({
  title,
  done,
}: {
  title: string;
  done: boolean;
}) {
  return (
    <div className="stepHeader">
      <span className="stepTitle">{title}</span>
      <span className={done ? "chip done" : "chip"}>{done ? "已完成" : "未完成"}</span>
    </div>
  );
}

export function StepCard({
  plan,
  completed,
  onCompleteStep,
  onPlayPhoneme,
  onPlayWord,
  canComplete = true,
  phonemesForTabs,
  activePhonemeIdx = 0,
  onSelectPhoneme,
}: StepCardProps) {
  const handleStep = (step: 1 | 2 | 3) => {
    if (canComplete) onCompleteStep(step);
  };
  const showPhonemeTabs = phonemesForTabs && phonemesForTabs.length > 1 && onSelectPhoneme != null;

  return (
    <section className="card">
      <div className="sectionRow">
        <h2 className="sectionTitle">今日学习卡片</h2>
        <span className="chip">3 步速学</span>
      </div>

      {showPhonemeTabs && (
        <div className="stepBlock">
          <span className="stepTitle" style={{ display: "block", marginBottom: 8 }}>选择音标</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {phonemesForTabs.map((p) => (
              <button
                key={`${p.ipa}-${p.indexInPhonemes}`}
                type="button"
                onClick={() => onSelectPhoneme?.(p.indexInPhonemes)}
                className={activePhonemeIdx === p.indexInPhonemes ? "segment active" : "segment"}
                style={{ padding: "6px 12px" }}
              >
                {`/${p.ipa}/`}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="stepBlock">
        <StepHeader title="Step 1 单独音标的读音" done={completed.step1Done} />
        <div className="actionRow" style={{ alignItems: "center", flexWrap: "nowrap", gap: 8 }}>
          <div className="ipaHero" style={{ margin: 0 }}>{plan.phonemeIPA}</div>
          <AudioButton compact onClick={onPlayPhoneme} title="播放音素" />
        </div>
        <button type="button" className={`stepCompleteBtn${completed.step1Done ? " completed" : ""}`} onClick={() => handleStep(1)} disabled={!canComplete} title={!canComplete ? "仅当天任务可标记完成" : undefined}>
          已掌握
        </button>
      </div>

      <div className="stepBlock">
        <StepHeader title="Step 2 常见字母组合" done={completed.step2Done} />
        <div className="chipWrap">
          {(plan.graphemes ?? []).map((grapheme) => (
            <span key={grapheme} className="chip">
              {grapheme}
            </span>
          ))}
        </div>
        <button type="button" className={`stepCompleteBtn${completed.step2Done ? " completed" : ""}`} onClick={() => handleStep(2)} disabled={!canComplete} title={!canComplete ? "仅当天任务可标记完成" : undefined}>
          已掌握
        </button>
      </div>

      <div className="stepBlock">
        <StepHeader title="Step 3 对应单词" done={completed.step3Done} />
        <ul className="wordList">
          {(plan.words ?? []).map((item) => (
            <li key={item.word} className="wordRow">
              <div className="wordRowText">
                <span className="wordRowWord">{item.word}</span>
                <span className="wordRowIpa">
                  {(() => {
                    const ipa = item.ipa ?? item.ipaUK ?? item.ipaUS;
                    return ipa ? `/${ipa}/` : "—";
                  })()}
                </span>
              </div>
              <AudioButton compact onClick={() => onPlayWord(item.word)} title="播放单词" />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={"stepCompleteBtn" + (completed.step3Done ? " completed" : "")}
          onClick={() => handleStep(3)}
          disabled={!canComplete}
          title={!canComplete ? "仅当天任务可标记完成" : undefined}
        >
          已掌握
        </button>
      </div>
    </section>
  );
}
