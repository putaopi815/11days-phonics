"use client";

export function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  cancelText = "取消",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <h3 className="modalTitle">{title}</h3>
        <p className="bodyText">{description}</p>
        <div className="modalActions">
          <button type="button" className="modalCancelBtn" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="modalConfirmBtn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
