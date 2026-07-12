"use client";

import { useActionState } from "react";
import type { AuthActionState } from "../lib/auth-actions";

interface AuthFormProps {
  action: (prevState: AuthActionState, formData: FormData) => Promise<AuthActionState>;
  submitLabel: string;
  pendingLabel: string;
}

const initialState: AuthActionState = {};

export default function AuthForm({ action, submitLabel, pendingLabel }: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction}>
      {state.error && <div className="form-error">{state.error}</div>}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Mật khẩu</label>
        <input id="password" name="password" type="password" required minLength={6} autoComplete="current-password" />
      </div>
      <button type="submit" className="btn-primary" disabled={isPending}>
        {isPending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
