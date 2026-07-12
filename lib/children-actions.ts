"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { getSession } from "./session";

export interface ChildActionState {
  error?: string;
}

export async function addChildAction(_prev: ChildActionState, formData: FormData): Promise<ChildActionState> {
  const session = await getSession();
  if (!session) return { error: "Vui lòng đăng nhập lại." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Vui lòng nhập tên bé." };

  await prisma.child.create({ data: { userId: session.userId, name } });
  revalidatePath("/dashboard");
  return {};
}

export async function deleteChildAction(childId: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  // Chỉ xoá được nếu hồ sơ con thực sự thuộc về đúng phụ huynh đang đăng
  // nhập — tránh 1 tài khoản xoá được hồ sơ con của tài khoản khác dù biết
  // trước id.
  await prisma.child.deleteMany({ where: { id: childId, userId: session.userId } });
  revalidatePath("/dashboard");
}
