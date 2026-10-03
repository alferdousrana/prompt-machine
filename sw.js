/* Offline support. Change VERSION whenever you update files. */
const VERSION = "pm-v1";
const SHELL = ["./", "./index.html", "./style.css", "./data.js", "./app.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Stale-while-revalidate: fast from cache, refreshed in background
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(e.request);
    const net = fetch(e.request).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone());
      return res;
    }).catch(() => cached);
    return cached || net;
  }));
});
