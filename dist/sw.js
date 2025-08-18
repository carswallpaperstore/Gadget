const CACHE_NAME = 'gadget-india-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // /assets काढले कारण ते folder आहे, file नाही
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Push
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'नई tech update available है!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 },
    actions: [
      { action: 'explore', title: 'Read Now' },
      { action: 'close', title: 'Close' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification('TechGuru India', options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return fetch('/api/posts')
    .then(res => res.json())
    .then(data => {
      return caches.open(CACHE_NAME).then(cache => {
        cache.put('/api/posts', new Response(JSON.stringify(data)));
      });
    })
    .catch(err => console.log(err));
}
