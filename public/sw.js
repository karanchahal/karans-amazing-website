var staticCacheName = 'kblog-static-v7';
var postsCache = 'kblog-posts-v1';
var allCaches =  [
  staticCacheName,
  postsCache
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/css/pixyll.css',
        'http://fonts.googleapis.com/css?family=Lato:900,300',
        'http://fonts.googleapis.com/css?family=Merriweather:900,900italic,300,300italic',
        'http://localhost:3030/media/descriptions.json'
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

self.addEventListener('push', function(event) {
  console.log(event)
});

self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.

  var requestUrl = new URL(event.request.url);

  if(requestUrl.origin.startsWith('http://fonts.googleapis')) {
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

    if(requestUrl.pathname.startsWith('/static/js')) {

      event.respondWith(
          fetch(requestUrl).catch(error => {
              console.log('Serving Cached version of Js')
              return caches.match(requestUrl);
          })
      );
    }


  }

  if(requestUrl.pathname.startsWith('/media/descriptions.json')) {

    event.respondWith(
        fetch(requestUrl).catch(error => {
            console.log('Serving Cached Blog post items')
            return caches.match(requestUrl);
        })
    );
  }

  if(requestUrl.pathname.startsWith('/posts/')) {
    event.respondWith(storePosts(event.request));
    return;
  }
});


function storePosts(request) {
  console.log('Caching blog posts')
  var storageUrl = new URL(request.url);
  return caches.open(postsCache).then(function(cache) {
    return cache.match(storageUrl).then(function(response) {
      if(response) return response;

      return fetch(request).then(function(networkResponse) {
        cache.put(storageUrl,networkResponse.clone())
        return networkResponse;
      })
    })
  })
}
