/* DopaminDrive Service Worker — macht die App offline-fähig.
   Bei jeder Änderung an index.html die CACHE-Version hochzählen! */
var CACHE = 'dopamindrive-v1';
var ASSETS = [
  '.',
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin === location.origin) {
    // Eigene Dateien: Netz zuerst (damit Updates ankommen), Cache als Offline-Fallback
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return r;
      }).catch(function () {
        return caches.match(e.request, { ignoreSearch: true }).then(function (m) {
          return m || caches.match('index.html');
        });
      })
    );
  } else {
    // Fremde Ressourcen (Icon-Font vom CDN): Cache zuerst, sonst Netz und merken
    e.respondWith(
      caches.match(e.request).then(function (m) {
        if (m) return m;
        return fetch(e.request).then(function (r) {
          var copy = r.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
          return r;
        });
      })
    );
  }
});
