import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

// Đăng ký service worker để trình duyệt coi app là PWA hợp lệ (điều kiện để
// hiện nút "Cài đặt ứng dụng"/"Thêm vào màn hình chính" trên điện thoại).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
