"use client";

import { useActionState } from "react";
import { forgotPasswordAction, type AuthActionState } from "../lib/auth-actions";

const initialState: AuthActionState = {};

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  return (
    <form action={formAction}>
      {state.error && <div className="form-error">{state.error}</div>}
      {state.success && <div className="form-success">{state.success}</div>}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? "Đang gửi..." : "Gửi hướng dẫn đặt lại mật khẩu"}
      </button>
    </form>
  );
}
