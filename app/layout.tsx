import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luyện Phiên Âm IPA",
  description: "Tài khoản phụ huynh cho app Luyện Phiên Âm IPA — quản lý nhiều hồ sơ con.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
