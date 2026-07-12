import Link from "next/link";
import ForgotPasswordForm from "../../components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Quên mật khẩu</h1>
        <ForgotPasswordForm />
        <p className="auth-links">
          <Link href="/login">← Quay lại đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
