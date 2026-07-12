import { Resend } from "resend";

export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Thiếu biến môi trường RESEND_API_KEY");

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  await resend.emails.send({
    from,
    to,
    subject: "Đặt lại mật khẩu — Luyện Phiên Âm IPA",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1a3d91;">Đặt lại mật khẩu</h2>
        <p>Chào bạn, chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản Luyện Phiên Âm IPA của bạn.</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; background: #2f63e8; color: #fff; padding: 10px 20px; border-radius: 999px; text-decoration: none; font-weight: bold;">
            Đặt lại mật khẩu
          </a>
        </p>
        <p>Đường link có hiệu lực trong 30 phút. Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
      </div>
    `,
  });
}
