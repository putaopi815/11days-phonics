"use client";

interface Option<T extends string> {
  label: string;
  value: T;
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="segmentedControl" role="tablist" aria-label="切换">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === value ? "segment active" : "segment"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
