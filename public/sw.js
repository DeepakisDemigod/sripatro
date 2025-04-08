self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const img = "pwa-128×128.png";

self.addEventListener('push', event => {
  const data = event.data?.text() || 'Push notification';
  self.registration.showNotification('Push Message', {
    body: data,
    icon: img,
    badge: "./pwa-72x72.png"
  });
});
