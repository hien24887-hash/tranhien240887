import Link from "next/link";
import AuthForm from "../../components/auth-form";
import { loginAction } from "../../lib/auth-actions";

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Đăng nhập</h1>
        <AuthForm action={loginAction} submitLabel="Đăng nhập" pendingLabel="Đang đăng nhập..." />
        <p className="auth-links">
          Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
          <br />
          <Link href="/forgot-password">Quên mật khẩu?</Link>
        </p>
      </div>
    </div>
  );
}
