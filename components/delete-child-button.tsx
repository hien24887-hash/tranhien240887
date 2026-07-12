"use client";

import { useTransition } from "react";
import { deleteChildAction } from "../lib/children-actions";

export default function DeleteChildButton({ childId, childName }: { childId: string; childName: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Xoá hồ sơ của ${childName}? Toàn bộ tiến trình học sẽ mất, không thể hoàn tác.`)) return;
    startTransition(() => {
      deleteChildAction(childId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      style={{
        background: "none",
        border: "none",
        color: "var(--incorrect)",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: 700,
      }}
    >
      {isPending ? "Đang xoá..." : "Xoá hồ sơ"}
    </button>
  );
}
