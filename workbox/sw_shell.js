// This file will be used to generate the sw.js file
// pull in workbox
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉!!");

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
    onSync: async ({ queue }) => {
      console.log("onsync event fired by browser");
      let entry;
      while (entry = await this.shiftRequest()) {
        try {
          await fetch(entry.request);
        } catch (error) {
          console.error('Replay failed for request', entry.request, error);
          await this.unshiftRequest(entry);
          return;
        }
      }
      console.log('Replay complete!');
    }
  });

  workbox.routing.registerRoute(
    new RegExp("^[^/]*//jsonplaceholder.typicode.com/todos"),
    new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    "POST"
  );

  // const bgQueue = new workbox.backgroundSync.Queue('pwaTestQueue', {
  //   // Retry for max of 24 Hours
  //   maxRetentionTime: 24 * 60,
  //   // the new bit
  //   onSync: async ({ queue }) => {
  //     console.log("onsync event fired by browser");
  //     let entry;
  //     while (entry = await this.shiftRequest()) {
  //       try {
  //         await fetch(entry.request);
  //       } catch (error) {
  //         console.error('Replay failed for request', entry.request, error);
  //         await this.unshiftRequest(entry);
  //         return;
  //       }
  //     }
  //     console.log('Replay complete!');
  //   }
  // });
  // self.addEventListener('fetch', function (e) {
  //   console.log("fetch failure listener");
  //   if (!new RegExp("^[^/]*//jsonplaceholder.typicode.com/todos").test(e.request.url)) {
  //     return;
  //   }
  //
  //
  //   console.log("json placeholder failure");
  //   const clone = e.request.clone();
  //   e.respondWith(fetch(e.request).catch((err) => {
  //     bgQueue.pushRequest({
  //       request: clone,
  //     });
  //     throw err;
  //   }));
  // });

  console.log("made it to precacheAndRoute");
  //injected by workbox-cli based on workbox-config.js
  workbox.precaching.precacheAndRoute([]);


  console.log("made it to end of workbox setup");
} else {
  console.log("Boo! Workbox didn't load 😬");
}
