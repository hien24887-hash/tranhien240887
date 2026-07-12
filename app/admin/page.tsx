import { redirect } from "next/navigation";
import { isAdminSession } from "../../lib/admin-session";
import { adminLogoutAction } from "../../lib/admin-actions";
import { prisma } from "../../lib/db";
import { trialDaysLeft } from "../../lib/trial";
import ActivateUserButton from "../../components/activate-user-button";

export default async function AdminPage() {
  const isAdmin = await isAdminSession();
  if (!isAdmin) redirect("/admin/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { children: { select: { id: true, name: true } } },
  });

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
        <h1>Quản trị tài khoản</h1>
        <form action={adminLogoutAction}>
          <button type="submit" className="btn-primary" style={{ width: "auto" }}>
            Đăng xuất
          </button>
        </form>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.2rem" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid var(--border)" }}>
            <th style={{ padding: "0.5rem" }}>Email</th>
            <th style={{ padding: "0.5rem" }}>Hồ sơ con</th>
            <th style={{ padding: "0.5rem" }}>Ngày đăng ký</th>
            <th style={{ padding: "0.5rem" }}>Trạng thái</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const daysLeft = trialDaysLeft(user.createdAt);
            return (
              <tr key={user.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.5rem" }}>{user.email}</td>
                <td style={{ padding: "0.5rem" }}>{user.children.map((c) => c.name).join(", ") || "—"}</td>
                <td style={{ padding: "0.5rem" }}>{user.createdAt.toLocaleDateString("vi-VN")}</td>
                <td style={{ padding: "0.5rem" }}>
                  {user.isActivated ? (
                    <span style={{ color: "var(--correct, #16a673)", fontWeight: 700 }}>Đã kích hoạt</span>
                  ) : daysLeft > 0 ? (
                    <span style={{ color: "var(--sun)", fontWeight: 700 }}>Còn thử {daysLeft} ngày</span>
                  ) : (
                    <span style={{ color: "var(--incorrect)", fontWeight: 700 }}>Hết hạn, chưa thanh toán</span>
                  )}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  <ActivateUserButton userId={user.id} isActivated={user.isActivated} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
