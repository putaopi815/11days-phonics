"use client";

interface CalendarCell {
  date: number;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isDone?: boolean;
}

export function CalendarGrid({
  monthLabel,
  cells,
  onSelect,
}: {
  monthLabel: string;
  cells: CalendarCell[];
  onSelect?: (date: number) => void;
}) {
  return (
    <section className="card">
      <div className="sectionRow">
        <h2 className="sectionTitle">{monthLabel}</h2>
        <span className="metaText">完成 3/3 自动打勾</span>
      </div>
      <div className="calendarHeader">
        {["一", "二", "三", "四", "五", "六", "日"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="calendarGrid">
        {cells.map((cell, index) => (
          <button
            key={`${cell.date}-${index}`}
            type="button"
            className={cell.isToday ? "calendarCell today" : "calendarCell"}
            onClick={() => onSelect?.(cell.date)}
          >
            <span className={!cell.isCurrentMonth ? "mutedText" : undefined}>
              {cell.date}
            </span>
            {cell.isDone ? (
              <span className="calendarDone" aria-label="已完成">✓</span>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
