import type { DayPlan, PhonemeItem } from "../types";

/** 根据计划与开始日期计算当前学习日（1–11） */
export function getCurrentDayIndex(
  plans: { dayIndex: number }[],
  startDate?: string,
): number {
  if (!plans.length) return 1;
  const days = [...new Set(plans.map((p) => p.dayIndex))].sort((a, b) => a - b);
  if (!startDate) return days[0] ?? 1;
  try {
    const start = new Date(startDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) / (24 * 60 * 60 * 1000),
    );
    const oneBased = diffDays + 1;
    if (oneBased < 1) return days[0] ?? 1;
    if (oneBased > 11) return 11;
    return days.includes(oneBased) ? oneBased : Math.min(oneBased, days[days.length - 1] ?? 1);
  } catch {
    return days[0] ?? 1;
  }
}

/** 从当天 plan 解析出音标列表（支持 v2 phonemes 与 v1 单音标） */
export function getPhonemesForPlan(plan: DayPlan | undefined): PhonemeItem[] {
  if (!plan) return [];
  if (plan.phonemes?.length) return plan.phonemes;
  if (plan.phonemeIPA) {
    const ipa = plan.phonemeIPA.replace(/^\/|\/$/g, "").trim();
    return [
      {
        ipa,
        graphemes: plan.graphemes ?? [],
        words: plan.words ?? [],
        tips: plan.hintZh,
      },
    ];
  }
  return [];
}
