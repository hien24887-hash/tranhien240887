"use client";

import { useActionState } from "react";
import { addChildAction, type ChildActionState } from "../lib/children-actions";

const initialState: ChildActionState = {};

export default function AddChildForm() {
  const [state, formAction, isPending] = useActionState(addChildAction, initialState);

  return (
    <form action={formAction} style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", flexWrap: "wrap" }}>
      {state.error && <div className="form-error" style={{ width: "100%" }}>{state.error}</div>}
      <input name="name" placeholder="Tên bé" required style={{ flex: 1, minWidth: "160px" }} className="field-inline" />
      <button type="submit" className="btn-primary" style={{ width: "auto" }} disabled={isPending}>
        {isPending ? "Đang thêm..." : "+ Thêm hồ sơ con"}
      </button>
    </form>
  );
}
