"use client";

import { useActionState } from "react";
import { adminLoginAction, type AdminAuthState } from "../lib/admin-actions";

const initialState: AdminAuthState = {};

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialState);

  return (
    <form action={formAction}>
      {state.error && <div className="form-error">{state.error}</div>}
      <div className="field">
        <label htmlFor="password">Mật khẩu quản trị</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
