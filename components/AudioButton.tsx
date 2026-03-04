"use client";

import type { ReactNode } from "react";

interface AudioButtonProps {
  label?: string;
  compact?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
}

export function AudioButton({
  label = "播放",
  compact = false,
  onClick,
  icon,
  title,
}: AudioButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={compact ? "audioButton compact" : "audioButton"}
    >
      <span>{icon ?? "▶"}</span>
      {!compact ? <span>{label}</span> : null}
    </button>
  );
}
