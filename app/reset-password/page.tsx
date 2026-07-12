import Link from "next/link";
import ResetPasswordForm from "../../components/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="auth-shell">
        <div className="auth-card">
          <h1>Đặt lại mật khẩu</h1>
          <div className="form-error">Đường link không hợp lệ. Vui lòng yêu cầu lại từ trang quên mật khẩu.</div>
          <p className="auth-links">
            <Link href="/forgot-password">Quên mật khẩu</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Đặt lại mật khẩu</h1>
        <ResetPasswordForm token={token} />
        <p className="auth-links">
          <Link href="/login">← Quay lại đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
