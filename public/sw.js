var CACHE_NAME = 'neighborhood-map-v1';
var FILES_TO_CACHE = [
    '/',
    '/static/js/bundle.js',
];

async function cacheAllResources() {
    let c = await caches.open(CACHE_NAME);
    return c.addAll(FILES_TO_CACHE);
}

// Cache all files on install
self.addEventListener('install', e => {
    e.waitUntil(cacheAllResources());
});

self.addEventListener('fetch', event => event.respondWith(fetchHandler(event)));

async function fetchHandler(event) {
  const cacheUrl = event.request.url.split('?')[0];
  const cache = await caches.open(CACHE_NAME);
  const cacheResp = await cache.match(cacheUrl);
  return cacheResp || fetch(event.request);
}


