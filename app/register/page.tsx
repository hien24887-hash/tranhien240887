import Link from "next/link";
import AuthForm from "../../components/auth-form";
import { registerAction } from "../../lib/auth-actions";

export default function RegisterPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Đăng ký</h1>
        <AuthForm action={registerAction} submitLabel="Đăng ký" pendingLabel="Đang đăng ký..." />
        <p className="auth-links">
          Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
