"use client";

import { useState, useMemo, useEffect } from "react";
import { BottomTabs } from "../../components/BottomTabs";
import { DayPickerSheet } from "../../components/DayPickerSheet";
import { StepCard } from "../../components/StepCard";
import { Toast } from "../../components/Toast";
import { getCurrentDayIndex, getPhonemesForPlan } from "../../lib/planUtils";
import { useLearningStore } from "../../lib/store";
import { playIpaAudio, playWordAudio } from "../../lib/audio";
import { playIpa } from "../../lib/playIpa";
import { seedPlans } from "../../data/seed";
import type { DayPlan, PhonemeItem } from "../../types";

/** 把当前音标转成 StepCard 需要的 DayPlan 形状 */
function toStepPlan(dayIndex: number, p: PhonemeItem): DayPlan {
  return {
    dayIndex,
    phonemeIPA: `/${p.ipa}/`,
    graphemes: p.graphemes,
    words: p.words,
    hintZh: p.tips,
  };
}

function TodayPageInner() {
  const { state, completeStep } = useLearningStore();
  const currentDayIndex = getCurrentDayIndex(state.plans, state.settings.startDate);

  /** 用户选择的 Day（底部浮层选择 1–11），默认选“今天” */
  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
  const [daySheetOpen, setDaySheetOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const planForSelected = useMemo(
    () => state.plans.find((p) => p.dayIndex === selectedDayIndex),
    [state.plans, selectedDayIndex],
  );
  const phonemes = useMemo(() => getPhonemesForPlan(planForSelected), [planForSelected]);

  const [activePhonemeIdx, setActivePhonemeIdx] = useState(0);
  const currentPhoneme = phonemes[activePhonemeIdx];

  const isToday = selectedDayIndex === currentDayIndex;
  const totalDays = state.plans.length;

  /** 已完成全部步骤的 day 的 dayIndex 集合（与「我的」页统计一致） */
  const completedDayIndices = useMemo(() => {
    const set = new Set<number>();
    state.plans.forEach((plan) => {
      const phonemes = getPhonemesForPlan(plan).filter((p) => p.ipa !== "review");
      if (phonemes.length === 0) return;
      const allDone = phonemes.every((ph) => {
        const r = state.progress.find(
          (item) => item.dayIndex === plan.dayIndex && item.phonemeIpa === ph.ipa,
        );
        return r?.step1Done && r?.step2Done && r?.step3Done;
      });
      if (allDone) set.add(plan.dayIndex);
    });
    return set;
  }, [state.plans, state.progress]);

  /** 当前音标的进度（每个音标三个步骤单独判断） */
  const record = useMemo(() => {
    const r =
      state.progress.find(
        (item) =>
          item.dayIndex === selectedDayIndex && item.phonemeIpa === currentPhoneme.ipa,
      ) ?? {
        dayIndex: selectedDayIndex,
        phonemeIpa: currentPhoneme.ipa,
        step1Done: false,
        step2Done: false,
        step3Done: false,
      };
    return r;
  }, [state.progress, selectedDayIndex, currentPhoneme.ipa]);

  /** 当日总步数 = 所有音标 × 3；当日已完成 = 该天所有 progress 记录的步数之和 */
  const totalStepsForDay = phonemes.filter((p) => p.ipa !== "review").length * 3;
  const doneCountForDay = useMemo(() => {
    const dayRecords = state.progress.filter((item) => item.dayIndex === selectedDayIndex);
    return dayRecords.reduce(
      (sum, r) =>
        sum + [r.step1Done, r.step2Done, r.step3Done].filter(Boolean).length,
      0,
    );
  }, [state.progress, selectedDayIndex]);
  const isFinished = totalStepsForDay > 0 && doneCountForDay >= totalStepsForDay;
  const progressWidth =
    totalStepsForDay > 0
      ? `${(doneCountForDay / totalStepsForDay) * 100}%`
      : "0%";

  /** Toast 出现后 1 秒自动消失 */
  useEffect(() => {
    if (isFinished) {
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 1000);
      return () => clearTimeout(t);
    } else {
      setShowToast(false);
    }
  }, [isFinished]);

  if (!planForSelected || !currentPhoneme) {
    return (
      <div className="appViewport">
        <header className="pageHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <h1 style={{ margin: 0 }}>学习</h1>
          <button
            type="button"
            className="bodyText dayPickerTrigger"
            onClick={() => setDaySheetOpen(true)}
            aria-label="选择学习日"
          >
            Day {selectedDayIndex} / {totalDays}
          </button>
        </header>
        <main className="pageContent">
          <section className="emptyState">
            <div className="emptyIcon">◌</div>
            <h2 className="sectionTitle">暂无学习内容</h2>
            <p className="bodyText">请选择其他天数。</p>
          </section>
        </main>
        <DayPickerSheet
          open={daySheetOpen}
          selectedDayIndex={selectedDayIndex}
          totalDays={totalDays}
          completedDayIndices={completedDayIndices}
          onConfirm={(dayIndex) => setSelectedDayIndex(dayIndex)}
          onClose={() => setDaySheetOpen(false)}
        />
        <BottomTabs activeTab="today" />
      </div>
    );
  }

  /** 优先用 seed 中带 ipa 的单词数据，避免 localStorage 恢复的 plans 缺少 word.ipa 导致显示为 — */
  const seedPlan = seedPlans.find((p) => p.dayIndex === selectedDayIndex);
  const seedPhonemes = getPhonemesForPlan(seedPlan);
  const phonemeForCard =
    seedPhonemes.find((ph) => ph.ipa === currentPhoneme.ipa) ?? currentPhoneme;
  const planForCard = toStepPlan(selectedDayIndex, phonemeForCard);
  const phonemesForTabs = phonemes
    .filter((p) => p.ipa !== "review")
    .map((p) => ({ ipa: p.ipa, indexInPhonemes: phonemes.indexOf(p) }));

  return (
    <div className="appViewport">
      <header className="pageHeader" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0 }}>学习</h1>
        <button
          type="button"
          className="bodyText dayPickerTrigger"
          onClick={() => setDaySheetOpen(true)}
          aria-label="选择学习日"
        >
          Day {selectedDayIndex} / {totalDays}
        </button>
      </header>
      <main className="pageContent">
        <section className="card">
          <div className="progressRow">
            <strong>{isToday ? "今日进度" : `Day ${selectedDayIndex} 进度`}</strong>
            <span className="metaText">
              {isFinished ? (
                <>
                  已完成{" "}
                  <svg className="progressDoneIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M799.32 959.508h-574.2c-81.9 0.1-148.3-66.3-148.4-148.1v-537.1c0.3-81.8 66.6-148.1 148.4-148.4v63.8c-46.6 0 620.3 0 573.7-63.8 81.9-0.1 148.3 66.3 148.4 148.1V810.908c0.4 81.6-65.5 148.1-147.1 148.5-0.3 0.1-0.5 0.1-0.8 0.1z" fill="#46D8AB" />
                    <path d="M735.32 251.608h-446.6c-51.7 0-93.7-41.9-93.7-93.7s41.9-93.7 93.7-93.7h446.6c51.7 0 93.7 41.9 93.7 93.7s-42 93.7-93.7 93.7z" fill="#46D8AB" />
                    <path d="M734.02 219.908h-444.6c-21.7-4.8-35.3-26.3-30.5-48 3.4-15.2 15.3-27.1 30.5-30.5h444.6c19.4 2.4 33.5 19.7 31.9 39.3 1.2 19.3-12.7 36.3-31.9 39.2z" fill="#80ECCB" />
                    <path d="M385.632 748.268c-13.4-13.3-13.4-34.9-0.1-48.2 0-0.1 0.1-0.1 0.1-0.1l337.2-337.2c13.7-13 35.3-12.5 48.4 1.2 12.5 13.2 12.5 33.9 0 47.1l-337.5 337.2c-13.1 13.3-34.4 13.4-47.7 0.4l-0.4-0.4z" fill="#FCFCFC" />
                    <path d="M434.132 748.268c-13.3 13.4-34.9 13.4-48.2 0.1l-0.1-0.1-131.8-131.7c-13.7-13-14.2-34.7-1.2-48.4 13-13.7 34.7-14.2 48.4-1.2l1.2 1.2 131.7 131.7c0.6 3.8-108.2 26.1 0 48.4z" fill="#FCFCFC" />
                  </svg>
                </>
              ) : (
                `已完成 ${doneCountForDay}/${totalStepsForDay}`
              )}
            </span>
          </div>
          <div className="progressBar" aria-label="进度">
            <span style={{ width: progressWidth }} />
          </div>
        </section>

        <StepCard
          plan={planForCard}
          completed={record}
          onCompleteStep={(step) =>
            completeStep(selectedDayIndex, currentPhoneme.ipa, step)
          }
          onPlayPhoneme={() => {
            if (currentPhoneme.ipa === "review") return;
            playIpa(currentPhoneme.ipa).catch(() => {
              playIpaAudio(planForCard.phonemeIPA ?? `/${currentPhoneme.ipa}/`, state.settings.accent);
            });
          }}
          onPlayWord={(word) => playWordAudio(word, state.settings.accent)}
          canComplete={true}
          phonemesForTabs={phonemesForTabs.length > 1 ? phonemesForTabs : undefined}
          activePhonemeIdx={activePhonemeIdx}
          onSelectPhoneme={setActivePhonemeIdx}
        />
      </main>

      {showToast ? <Toast message="太棒了！你完成了今天的学习" /> : null}
      <DayPickerSheet
        open={daySheetOpen}
        selectedDayIndex={selectedDayIndex}
        totalDays={totalDays}
        completedDayIndices={completedDayIndices}
        onConfirm={(dayIndex) => {
          setSelectedDayIndex(dayIndex);
          setActivePhonemeIdx(0);
        }}
        onClose={() => setDaySheetOpen(false)}
      />
      <BottomTabs activeTab="today" />
    </div>
  );
}

export default function TodayPage() {
  return <TodayPageInner />;
}
