"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { createAdminSession, destroyAdminSession } from "./admin-session";

export interface AdminAuthState {
  error?: string;
}

export async function adminLoginAction(_prev: AdminAuthState, formData: FormData): Promise<AdminAuthState> {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return { error: "Chưa cấu hình ADMIN_PASSWORD." };
  if (password !== adminPassword) return { error: "Sai mật khẩu." };

  await createAdminSession();
  redirect("/admin");
}

export async function adminLogoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function activateUserAction(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { isActivated: true, activatedAt: new Date() },
  });
  revalidatePath("/admin");
}

export async function deactivateUserAction(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { isActivated: false, activatedAt: null },
  });
  revalidatePath("/admin");
}
