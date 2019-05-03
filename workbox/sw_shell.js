// This file will be used to generate the sw.js file
// pull in workbox
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉!!");

  //injected by workbox-cli based on workbox-config.js
  workbox.precaching.precacheAndRoute([]);

  // Setup a cache
  workbox.core.setCacheNameDetails({
    prefix: "pwa-test",
    suffix: "v1",
  });

  // Register all js routes to use network first strategy
  workbox.routing.registerRoute(
    /\.js/,
    new workbox.strategies.NetworkFirst(),
  );

  // Cache all css files, update in the background ASAP
  workbox.routing.registerRoute(
    /\.css/,
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name
      cacheName: "css-cache",
    }),
  );

  // Cache all image files, use cache first strategy
  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    new workbox.strategies.CacheFirst({
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


  // Cache the cdn jsdelivr scripts, update it in the background asap
  workbox.routing.registerRoute(
    new RegExp("^[^/]*//cdn.jsdelivr.net/npm/.*\\.(js|css)$"),
    new workbox.strategies.StaleWhileRevalidate({
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

  const bgSyncPlugin = new workbox.backgroundSync.Plugin("pwaTestQueue", {
    // Retry for max of 24 Hours
    maxRetentionTime: 24 * 60,
    // the new bit
    callbacks: {
      requestWillEnqueue: (request) => {
        console.log("will enqueue", request);
      },
      requestWillReplay: (request) => {
        console.log("will replay", request);
      },
      queueDidReplay: (requests) => {
        console.log("replaying queue", requests);
      }
    }
  });

  workbox.routing.registerRoute(
    new RegExp("^[^/]*//jsonplaceholder.typicode.com/todos"),
    new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    "POST"
  );

} else {
  console.log("Boo! Workbox didn't load 😬");
}
