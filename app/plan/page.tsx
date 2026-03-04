"use client";

import { BottomTabs } from "../../components/BottomTabs";
import { CalendarGrid } from "../../components/CalendarGrid";
import { getCurrentDayIndex, getPhonemesForPlan } from "../../lib/planUtils";
import { useLearningStore } from "../../lib/store";

function PlanPageInner() {
  const { state } = useLearningStore();

  /** 与「今天」tab 一致：当前学习日（1–11） */
  const currentDayIndex = getCurrentDayIndex(state.plans, state.settings.startDate);

  /** 某天完成 = 该天 progress 里已完成步数 ≥ 该天总步数（音标数×3）；与今天 tab 联动 */
  const doneDays = new Set(
    state.plans
      .filter((plan) => {
        const phonemes = getPhonemesForPlan(plan).filter((p) => p.ipa !== "review");
        const totalSteps = phonemes.length * 3;
        if (totalSteps === 0) return false;
        const dayRecords = state.progress.filter((item) => item.dayIndex === plan.dayIndex);
        const doneCount = dayRecords.reduce(
          (sum, r) =>
            sum + [r.step1Done, r.step2Done, r.step3Done].filter(Boolean).length,
          0,
        );
        return doneCount >= totalSteps;
      })
      .map((p) => p.dayIndex),
  );

  const cells = Array.from({ length: 35 }, (_, index) => {
    const date = index < 5 ? 24 + index : index - 4;
    const dayIndex = index >= 5 ? index - 4 : null;
    return {
      date,
      isCurrentMonth: index >= 5,
      isToday: dayIndex !== null && dayIndex === currentDayIndex,
      isDone: dayIndex !== null && doneDays.has(dayIndex),
    };
  });

  return (
    <div className="appViewport">
      <header className="pageHeader">
        <h1>计划</h1>
        <p className="bodyText">完成当天 3 个步骤后，日历会自动打勾</p>
      </header>

      <main className="pageContent">
        <CalendarGrid monthLabel="2026 年 3 月" cells={cells} />
      </main>

      <BottomTabs activeTab="today" />
    </div>
  );
}

export default function PlanPage() {
  return <PlanPageInner />;
}
