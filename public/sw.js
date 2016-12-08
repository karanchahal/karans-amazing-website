var staticCacheName = 'kblog-static-v4';

var allCaches =  [
  staticCacheName
];


self.addEventListener('install', function(event) {
  console.log('Installing')
})

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/css/pixyll.css',
        'http://fonts.gstatic.com/s/lato/v11/tI4j516nok_GrVf4dhunkg.woff2',
        'http://fonts.gstatic.com/s/merriweather/v13/EYh7Vl4ywhowqULgRdYwIHM1hBkL4m68a-ReB_y0NYc.woff2',
        'http://fonts.googleapis.com/css?family=Lato:900,300',
        'http://fonts.googleapis.com/css?family=Merriweather:900,900italic,300,300italic',
        'http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6ntDLwwZd-mS_8JqJ_KGXwxs.woff2',
        'http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nk4GofcKVZz6wtzX_QUIqsI.woff2'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log(cacheNames)
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('kblog-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.

  var requestUrl = new URL(event.request.url);

  if(requestUrl.origin.startsWith('http://fonts')) {
    console.log('Serving fonts')
    event.respondWith(caches.match(requestUrl));
    return;
  }

  if(requestUrl.origin === location.origin) {

    if (requestUrl.pathname === '/') {
      console.log('Serving skeleton')
      event.respondWith(caches.match(requestUrl));
      return;
    }

    if(requestUrl.pathname.startsWith('/css') ){
      console.log('Serving CSS');
      event.respondWith(caches.match('/css/pixyll.css'));
      return;
    }

  }

});
