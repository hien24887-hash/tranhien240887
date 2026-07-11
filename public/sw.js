// Service worker tối giản — chỉ để trình duyệt coi app là 1 Progressive Web
// App hợp lệ (điều kiện bắt buộc để hiện nút "Cài đặt ứng dụng"/"Thêm vào
// màn hình chính"), kèm cache cơ bản để mở lại được khi mất mạng tạm thời.
const CACHE_NAME = "ipa-app-shell-v1";
const APP_SHELL = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached ?? caches.match("/index.html")))
  );
});
