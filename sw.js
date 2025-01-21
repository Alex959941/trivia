const version = 'v123';  // change this everytime you update the service worker
                          // to force the browser to also update it.

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        'manifest.json',
        'index.html',
        'styles.css',
        'script.js',
        'icons/48.png',
        'icons/72.png',
        'icons/96.png',
        'icons/144.png',
        'icons/192.png',
        'icons/512.png',
        'icons/512_maskable.png',
        'icons/512_rounded.png',
        'sw.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});