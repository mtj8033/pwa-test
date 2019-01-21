// pull in workbox
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");

  // Setup a cache
  workbox.core.setCacheNameDetails({
    prefix: "pwa-test",
    suffix: "v1",
  });

  // Register all js routes to use network first strategy
  workbox.routing.registerRoute(
    /\.js/,
    workbox.strategies.networkFirst(),
  );

  // Cache all css files, update in the background ASAP
  workbox.routing.registerRoute(
    /\.css/,
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: "css-cache",
    }),
  );

  // Cache all image files, use cache first strategy
  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );


  // Cache the vue script, update it in the background asap
  workbox.routing.registerRoute(
    new RegExp("https://cdn.jsdelivr.net/npm/.*\\.(js|css)$"),
    workbox.strategies.staleWhileRevalidate({
      // NOTE: need to be extra careful with opaque responses as they can take
      // up a large amount of the cache
      // You need to provide a cache name when using expiration.
      cacheName: "jsdelivr",
      plugins: [
        new workbox.expiration.Plugin({
          // Keep at most 1 entries.
          maxEntries: 10,
          // Don"t keep any entries for more than 30 days.
          maxAgeSeconds: 30 * 24 * 60 * 60,
          // Automatically cleanup if quota is exceeded.
          purgeOnQuotaError: true,
        }),
      ],
    }),
  );
} else {
  console.log("Boo! Workbox didn't load 😬");
}
