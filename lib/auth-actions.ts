"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import { createSession, destroySession } from "./session";
import { generateResetToken, hashToken, getAppBaseUrl } from "./password-reset";
import { sendPasswordResetEmail } from "./email";

export interface AuthActionState {
  error?: string;
  success?: string;
}

export async function registerAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Vui lòng nhập đủ email và mật khẩu." };
  if (password.length < 6) return { error: "Mật khẩu cần ít nhất 6 ký tự." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Email này đã được đăng ký." };

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  await createSession({ userId: user.id, email: user.email });
  redirect("/dashboard");
}

export async function loginAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Email hoặc mật khẩu không đúng." };

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return { error: "Email hoặc mật khẩu không đúng." };

  await createSession({ userId: user.id, email: user.email });
  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}

export async function forgotPasswordAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return { error: "Vui lòng nhập email." };

  const user = await prisma.user.findUnique({ where: { email } });
  // Không tiết lộ email có tồn tại hay không — luôn trả lời thành công.
  if (user) {
    const { rawToken, tokenHash, expiresAt } = generateResetToken();
    await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt } });
    const resetUrl = `${getAppBaseUrl()}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(email, resetUrl);
  }

  return { success: "Nếu email này đã đăng ký, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu." };
}

export async function resetPasswordAction(_prev: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!token) return { error: "Đường link không hợp lệ." };
  if (password.length < 6) return { error: "Mật khẩu cần ít nhất 6 ký tự." };

  const tokenHash = hashToken(token);
  const resetToken = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { error: "Đường link đã hết hạn hoặc đã được sử dụng. Vui lòng yêu cầu lại." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { usedAt: new Date() } }),
  ]);

  return { success: "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập ngay bây giờ." };
}
