self.addEventListener('install', function(event) {
  console.log('Installing')
})

self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  console.log(event.request)
});
