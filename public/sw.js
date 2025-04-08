self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('push', event => {
  const data = event.data?.text() || 'Push notification';
  self.registration.showNotification('Push Message', {
    body: data,
  });
});
