import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { logoutAction } from "../../lib/auth-actions";
import { prisma } from "../../lib/db";
import AddChildForm from "../../components/add-child-form";
import DeleteChildButton from "../../components/delete-child-button";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const children = await prisma.child.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
        <h1>Hồ sơ của tôi</h1>
        <form action={logoutAction}>
          <button type="submit" className="btn-primary" style={{ width: "auto" }}>
            Đăng xuất
          </button>
        </form>
      </div>
      <p style={{ color: "var(--ink-soft)" }}>Đăng nhập với {session.email}</p>

      {children.length === 0 ? (
        <p>Chưa có hồ sơ con nào — thêm hồ sơ đầu tiên bên dưới.</p>
      ) : (
        <div className="child-grid">
          {children.map((child) => (
            <div key={child.id} className="child-card">
              <div className="child-card__name">{child.name}</div>
              <p style={{ margin: "0 0 0.6rem", color: "var(--ink-soft)", fontSize: "0.9rem" }}>
                ⭐ {child.totalStars} sao
              </p>
              <DeleteChildButton childId={child.id} childName={child.name} />
            </div>
          ))}
        </div>
      )}

      <AddChildForm />
    </div>
  );
}
