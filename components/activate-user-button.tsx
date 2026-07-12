"use client";

import { useTransition } from "react";
import { activateUserAction, deactivateUserAction } from "../lib/admin-actions";

export default function ActivateUserButton({ userId, isActivated }: { userId: string; isActivated: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      if (isActivated) deactivateUserAction(userId);
      else activateUserAction(userId);
    });
  }

  return (
    <button type="button" className={"btn" + (isActivated ? "" : " btn-primary")} onClick={handleClick} disabled={isPending}>
      {isPending ? "Đang lưu..." : isActivated ? "Huỷ kích hoạt" : "✅ Kích hoạt"}
    </button>
  );
}
