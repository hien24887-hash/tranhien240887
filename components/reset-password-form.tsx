"use client";

import { useActionState } from "react";
import { resetPasswordAction, type AuthActionState } from "../lib/auth-actions";

const initialState: AuthActionState = {};

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={token} />
      {state.error && <div className="form-error">{state.error}</div>}
      {state.success && <div className="form-success">{state.success}</div>}
      <div className="field">
        <label htmlFor="password">Mật khẩu mới</label>
        <input id="password" name="password" type="password" required minLength={6} autoComplete="new-password" />
      </div>
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? "Đang lưu..." : "Đặt lại mật khẩu"}
      </button>
    </form>
  );
}
