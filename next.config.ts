import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma sinh ra client ở thư mục tuỳ chỉnh "app/generated/prisma" (không
  // phải vị trí mặc định node_modules/.prisma/client) — công cụ dò file của
  // Next.js không tự nhận ra file engine gốc (.so.node) cần đóng gói theo,
  // khiến bản deploy trên Vercel thiếu file này dù build không báo lỗi.
  // Khai báo rõ để bắt buộc luôn đóng gói theo mọi route.
  outputFileTracingIncludes: {
    "/**": ["./app/generated/prisma/**/*"],
  },
};

export default nextConfig;
