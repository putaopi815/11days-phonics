"use client";

import { useState, useEffect, useMemo } from "react";

export function DayPickerSheet({
  open,
  selectedDayIndex,
  totalDays,
  completedDayIndices,
  onConfirm,
  onClose,
}: {
  open: boolean;
  selectedDayIndex: number;
  /** 与学习 tab、我的页统计一致的总学习天数 */
  totalDays: number;
  /** 已完成的 day 的 dayIndex 集合，用于在选项右侧显示「已完成」标签 */
  completedDayIndices?: Set<number>;
  onConfirm: (dayIndex: number) => void;
  onClose: () => void;
}) {
  const [pending, setPending] = useState(selectedDayIndex);
  const dayOptions = useMemo(
    () => Array.from({ length: Math.max(1, totalDays) }, (_, i) => i + 1),
    [totalDays],
  );

  useEffect(() => {
    if (open) setPending(selectedDayIndex);
  }, [open, selectedDayIndex]);

  if (!open) return null;

  const handleSelect = (d: number) => {
    setPending(d);
    onConfirm(d);
    onClose();
  };

  return (
    <div
      className="sheetOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="选择学习日"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sheetPanel" onClick={(e) => e.stopPropagation()}>
        <div className="sheetHandle" aria-hidden />
        <h3 className="sheetTitle">选择学习日</h3>
        <div className="sheetOptionList">
          {dayOptions.map((d) => (
            <button
              key={d}
              type="button"
              className={"sheetOptionRow" + (pending === d ? " selected" : "")}
              onClick={() => handleSelect(d)}
            >
              <span className="sheetOptionLabel">
                Day {d} / {totalDays}
                {completedDayIndices?.has(d) ? (
                  <span className="sheetOptionDoneTag">已完成</span>
                ) : null}
              </span>
              {pending === d ? (
                <span className="sheetOptionCheck" aria-hidden>✓</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
