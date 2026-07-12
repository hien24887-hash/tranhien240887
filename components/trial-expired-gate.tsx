import { logoutAction } from "../lib/auth-actions";

const ZALO_PHONE = "0329.225.486";

export default function TrialExpiredGate() {
  return (
    <div className="auth-shell">
      <div className="auth-card" style={{ maxWidth: 460, textAlign: "center" }}>
        <h1>Đã hết hạn dùng thử</h1>
        <p>
          Bạn đã dùng thử 4 ngày miễn phí. Quét mã QR bên dưới để thanh toán, sau đó liên hệ Zalo để được kích
          hoạt tài khoản.
        </p>
        <img
          src="/qr-payment.png"
          alt="Mã QR thanh toán"
          style={{ width: "100%", maxWidth: 280, margin: "1rem auto", display: "block", borderRadius: 12 }}
        />
        <p style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--brand-deep)" }}>
          Liên hệ Zalo: {ZALO_PHONE}
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
          Sau khi thanh toán, gửi ảnh chụp màn hình chuyển khoản qua Zalo — tài khoản sẽ được kích hoạt trong
          thời gian sớm nhất.
        </p>
        <form action={logoutAction} style={{ marginTop: "1rem" }}>
          <button type="submit" className="btn-primary">
            Đăng xuất
          </button>
        </form>
      </div>
    </div>
  );
}
