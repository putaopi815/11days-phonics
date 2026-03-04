"use client";

import { useMemo, useState } from "react";
import { BottomTabs } from "../../components/BottomTabs";
import { ConfirmModal } from "../../components/ConfirmModal";
import { getPhonemesForPlan } from "../../lib/planUtils";
import { useLearningStore } from "../../lib/store";

function MePageInner() {
  const { state, reset } = useLearningStore();
  const [open, setOpen] = useState(false);

  /** 已完成天数 = 该天所有音标的三个步骤都已完成 */
  const completedDays = useMemo(
    () =>
      state.plans.filter((plan) => {
        const phonemes = getPhonemesForPlan(plan).filter((p) => p.ipa !== "review");
        if (phonemes.length === 0) return false;
        return phonemes.every((ph) => {
          const r = state.progress.find(
            (item) => item.dayIndex === plan.dayIndex && item.phonemeIpa === ph.ipa,
          );
          return r?.step1Done && r?.step2Done && r?.step3Done;
        });
      }).length,
    [state.plans, state.progress],
  );

  const totalDays = state.plans.length;

  return (
    <div className="appViewport">
      <header className="pageHeader">
        <h1>我的</h1>
      </header>

      <main className="pageContent">
        <section className="meStatsCard">
          <h2 className="meStatsTitle">学习统计</h2>
          <div className="meStatRow">
            <div className="meStatBox">
              <span className="meStatNum">{completedDays}/{totalDays}</span>
              <span className="meStatLabel">已完成天数</span>
            </div>
          </div>
        </section>

        <button type="button" className="meDangerBtn" onClick={() => setOpen(true)}>
          重新开始学习
        </button>
      </main>

      <ConfirmModal
        open={open}
        title="确定重新开始？"
        description="将删除本地学习记录恢复初始状态。"
        confirmText="确定"
        cancelText="取消"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          reset();
          setOpen(false);
        }}
      />
      <BottomTabs activeTab="me" />
    </div>
  );
}

export default function MePage() {
  return <MePageInner />;
}
