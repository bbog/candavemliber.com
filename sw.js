

var CACHE_NAME = 'candeliber-cache-v010';
var urlsToCache = [
 '/',
 'index.html',
 'index.html?homescreen=1',
 '?homescreen=1',
 'css/style.min.css',
 'js/main.min.js'
];


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll(urlsToCache);
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