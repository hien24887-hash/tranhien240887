import AdminLoginForm from "../../../components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Quản trị</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
}
