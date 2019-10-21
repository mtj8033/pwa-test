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
      while (entry = await queue.shiftRequest()) {
        try {
          let clone = entry.request.clone();
          let response = await fetch(clone);
          let responseJSON = await response.json();
          // emit to the client
          let clients = await self.clients.matchAll();
          for (const client of clients) {
            client.postMessage(responseJSON);
          }
        } catch (error) {
          console.error('Replay failed for request', entry.request, error);
          await queue.unshiftRequest(entry);
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
  workbox.precaching.precacheAndRoute([
  {
    "url": "addtohomescreen.55a48cf4.js",
    "revision": "f830d93bb7153377bd968a3d3ca0431e"
  },
  {
    "url": "addtohomescreen.d8295224.css",
    "revision": "def7fd38dd45e9d2f0d5a3854331a278"
  },
  {
    "url": "android-launchericon-144-144.eba60c14.png",
    "revision": "654d6ab7d81fcee9d989b022975ab0cf"
  },
  {
    "url": "android-launchericon-192-192.45c662a6.png",
    "revision": "74dfa8d8400b6f9a40f34d4acd9ca3dd"
  },
  {
    "url": "android-launchericon-48-48.003e0e1b.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "android-launchericon-512-512.78af6e70.png",
    "revision": "3fd645e8fb94c99aa169a90be8ce40d1"
  },
  {
    "url": "android-launchericon-72-72.5dd14642.png",
    "revision": "1b22bccaea7f2dec92c68e418017f8f4"
  },
  {
    "url": "android-launchericon-96-96.3cd86d6f.png",
    "revision": "9de36c4d3899e2663ca6807d57e5deb9"
  },
  {
    "url": "chrome-extensionmanagementpage-48-48.003e0e1b.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "chrome-favicon-16-16.f5133158.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "chrome-installprocess-128-128.16e18811.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-general-128-128.16e18811.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-general-16-16.f5133158.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "firefox-general-256-256.dbae38a1.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "firefox-general-32-32.e1e21581.png",
    "revision": "148f2e55a4b90b6a2b6cedda64ee000c"
  },
  {
    "url": "firefox-general-48-48.003e0e1b.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "firefox-general-64-64.244b43ff.png",
    "revision": "2718a87e5578e3d1ec3a29e6015ee257"
  },
  {
    "url": "firefox-general-90-90.435a07fb.png",
    "revision": "eeb0aa126a37f1f5b9ae454b2ff8ddf6"
  },
  {
    "url": "firefox-marketplace-128-128.16e18811.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-marketplace-512-512.78af6e70.png",
    "revision": "3fd645e8fb94c99aa169a90be8ce40d1"
  },
  {
    "url": "index.html",
    "revision": "26c32c7ddc157b5513213c890ebec65e"
  },
  {
    "url": "ios-appicon-1024-1024.74317fc8.png",
    "revision": "181114a631c8ff07698f3417c291c5f6"
  },
  {
    "url": "ios-appicon-120-120.e192ee31.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "ios-appicon-152-152.c31f46f3.png",
    "revision": "014350ce4338c3a0ab817c84ede0a758"
  },
  {
    "url": "ios-appicon-180-180.1c9d9127.png",
    "revision": "4c59131aa1f909aa5cb24839256f3402"
  },
  {
    "url": "ios-appicon-76-76.507232d4.png",
    "revision": "a08e147f2e9d4c2f51e4fe7bea56f4a6"
  },
  {
    "url": "ios-launchimage-1024-768.0b1f3944.png",
    "revision": "0331bf2cd9084fb2096d62ef2da9bb0f"
  },
  {
    "url": "ios-launchimage-1242-2208.472ca326.png",
    "revision": "a1f244ee2f987a5537097096b07d5627"
  },
  {
    "url": "ios-launchimage-1334-750.57ccf34b.png",
    "revision": "a82e8cefc519cc3b33837c5f615c5f9d"
  },
  {
    "url": "ios-launchimage-1536-2048.bc56b05d.png",
    "revision": "d5be3cb22df1a0fecb6c40ca4db1e41a"
  },
  {
    "url": "ios-launchimage-2048-1536.1745f3a0.png",
    "revision": "ae3a0eafe06cfffd619c13f583ba80df"
  },
  {
    "url": "ios-launchimage-2208-1242.070af4c9.png",
    "revision": "732bf847405283136469c4b7d3c42c8d"
  },
  {
    "url": "ios-launchimage-640-1136.e6acd80f.png",
    "revision": "fd84c99eb60528ebd7cf0fc336e7e568"
  },
  {
    "url": "ios-launchimage-640-960.5afaac01.png",
    "revision": "b93d905264553c039c68bf8351f18fa0"
  },
  {
    "url": "ios-launchimage-750-1334.a0a538c7.png",
    "revision": "984733ad775eba416ecfca6f6f6a96f3"
  },
  {
    "url": "ios-launchimage-768-1024.71e4b056.png",
    "revision": "608dda8fb0743480fab91e0794225917"
  },
  {
    "url": "main.841951be.css",
    "revision": "6d393c82700bf485b93ae951e20a9688"
  },
  {
    "url": "main.a3e28513.js",
    "revision": "c2cb232fcd3816e7cfd57cf03ef95a52"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "59b8e732f0822ac011842fc2d18fd823"
  },
  {
    "url": "SplashScreen.scale-100.0e4fa0ce.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "SplashScreen.scale-125.e0695bf4.png",
    "revision": "940187501e0310fafd3a61a78460d1b9"
  },
  {
    "url": "SplashScreen.scale-150.42db09c6.png",
    "revision": "069dc41bc4e70d59a4ad2fa0017ff139"
  },
  {
    "url": "SplashScreen.scale-200.fe8af3b7.png",
    "revision": "0013a41c9abc723d90c37a5b324e3349"
  },
  {
    "url": "SplashScreen.scale-400.85ab27ee.png",
    "revision": "9efc975e9e118c2ab00213354cc83c05"
  },
  {
    "url": "Square150x150Logo.scale-100.53d55e74.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "Square150x150Logo.scale-125.45dc01e7.png",
    "revision": "86d014e9eaaa76f4a57f59f2a8d8454e"
  },
  {
    "url": "Square150x150Logo.scale-150.47c80a95.png",
    "revision": "5c609f98678be5245f311e90b1cc2bb5"
  },
  {
    "url": "Square150x150Logo.scale-200.05331c40.png",
    "revision": "d471ce20333e7bf987f19b69035723c5"
  },
  {
    "url": "Square150x150Logo.scale-400.b6407415.png",
    "revision": "6e0c3e5def82da02e8cd4e0901ca8be6"
  },
  {
    "url": "Square310x310Logo.scale-100.5a2bc5ed.png",
    "revision": "6668675ffe51e27a940dd6cc34d73292"
  },
  {
    "url": "Square310x310Logo.scale-125.f4e3b054.png",
    "revision": "e7a1851dd2e75d86da6793bd3cd11644"
  },
  {
    "url": "Square310x310Logo.scale-150.251d0352.png",
    "revision": "5389e1107fca97af1cea3556a19ab0f1"
  },
  {
    "url": "Square310x310Logo.scale-200.c485b09d.png",
    "revision": "692f7d5f8757066133f43eb31d6e2339"
  },
  {
    "url": "Square310x310Logo.scale-400.c4bc7849.png",
    "revision": "84fdc47f503cb4280778edcb6b335112"
  },
  {
    "url": "Square44x44Logo.scale-100.f083de53.png",
    "revision": "ab1230f94b5aa6d54fa5e1b5475c5ccb"
  },
  {
    "url": "Square44x44Logo.scale-125.85e96812.png",
    "revision": "405972578d12d2b0b79af09e163b8888"
  },
  {
    "url": "Square44x44Logo.scale-150.0ddf62d6.png",
    "revision": "67d2903c2833f3ed4b6aeaa1f0659dfb"
  },
  {
    "url": "Square44x44Logo.scale-200.35633c02.png",
    "revision": "7a2febc967df7065d2219735ba0b8ca8"
  },
  {
    "url": "Square44x44Logo.scale-400.bf355bb2.png",
    "revision": "0bc258e8f0d3b564187a0e33e2e9380c"
  },
  {
    "url": "Square44x44Logo.targetsize-16_altform-unplated.f5133158.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "Square44x44Logo.targetsize-16.f5133158.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "Square44x44Logo.targetsize-24_altform-unplated.7c1f3817.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "Square44x44Logo.targetsize-24.7c1f3817.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "Square44x44Logo.targetsize-256_altform-unplated.dbae38a1.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "Square44x44Logo.targetsize-256.dbae38a1.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "Square44x44Logo.targetsize-48_altform-unplated.003e0e1b.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "Square44x44Logo.targetsize-48.003e0e1b.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "Square71x71Logo.scale-100.0d75ccfd.png",
    "revision": "f9cb3b5ca47270d5ceb38248978cc78d"
  },
  {
    "url": "Square71x71Logo.scale-125.3831c8a4.png",
    "revision": "6f6ca1537e52e6f4c7b8a849cdbfbf0e"
  },
  {
    "url": "Square71x71Logo.scale-150.95ee5165.png",
    "revision": "7fe0fb4ec9aec15149911c9be1ab33f9"
  },
  {
    "url": "Square71x71Logo.scale-200.c3e94d82.png",
    "revision": "c9d8e04595b317580c73bf360e5209bb"
  },
  {
    "url": "Square71x71Logo.scale-400.b5b42b69.png",
    "revision": "74d728155896d866b034b7d32f6438fd"
  },
  {
    "url": "StoreLogo.c67214a9.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "StoreLogo.scale-100.c67214a9.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "StoreLogo.scale-125.e1dc3b8e.png",
    "revision": "f7ba29e393573da52ff94a9b61bc2817"
  },
  {
    "url": "StoreLogo.scale-150.af67febb.png",
    "revision": "07a6c9f46d1710ba7dd4075e9e136bf7"
  },
  {
    "url": "StoreLogo.scale-200.bc31bc57.png",
    "revision": "4d1871062d41c3078ad494372b9f42fb"
  },
  {
    "url": "StoreLogo.scale-400.abecad19.png",
    "revision": "a49727068bee66d1ba2a4e68650d5830"
  },
  {
    "url": "Wide310x150Logo.scale-100.509e6b69.png",
    "revision": "facfda60774acfc95676c69bd9afa1d8"
  },
  {
    "url": "Wide310x150Logo.scale-125.693c8fbd.png",
    "revision": "59013fa60b22b18d751d5f6c7b5a6e71"
  },
  {
    "url": "Wide310x150Logo.scale-150.723c1f64.png",
    "revision": "09562ef3f5f8d01846e6b47760a10156"
  },
  {
    "url": "Wide310x150Logo.scale-200.0e4fa0ce.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "Wide310x150Logo.scale-400.fe8af3b7.png",
    "revision": "0013a41c9abc723d90c37a5b324e3349"
  },
  {
    "url": "windows-smallsquare-24-24.7c1f3817.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "windows-smallsquare-30-30.f713f04b.png",
    "revision": "383fe36ddeb19cec955452bab211bfe2"
  },
  {
    "url": "windows-smallsquare-42-42.f080b348.png",
    "revision": "94ba08ea93cd0898f23b00e855d9a0cd"
  },
  {
    "url": "windows-smallsquare-54-54.47c24cbf.png",
    "revision": "a8bf8130eaf64e9fcccc956d2d60783a"
  },
  {
    "url": "windows-splashscreen-1116-540.3f383d5d.png",
    "revision": "a95417213dab978aa92417473f5d509a"
  },
  {
    "url": "windows-splashscreen-620-300.0e4fa0ce.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "windows-splashscreen-868-420.32c61a34.png",
    "revision": "25919c2b956aae0aa14cb0f4f97ba928"
  },
  {
    "url": "windows-squarelogo-120-120.e192ee31.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "windows-squarelogo-150-150.53d55e74.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "windows-squarelogo-210-210.7217d525.png",
    "revision": "90da731d3a004e678384ff6e6ba87dca"
  },
  {
    "url": "windows-squarelogo-270-270.6714ebef.png",
    "revision": "f9cce64bf6a5ff05275f7198244a51c9"
  },
  {
    "url": "windows-storelogo-50-50.c67214a9.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "windows-storelogo-70-70.f04808da.png",
    "revision": "bc81d3a1b3d723bdeab2371213aa3d98"
  },
  {
    "url": "windows-storelogo-90-90.435a07fb.png",
    "revision": "eeb0aa126a37f1f5b9ae454b2ff8ddf6"
  },
  {
    "url": "windowsphone-appicon-106-106.3e357d1b.png",
    "revision": "544827c0923d9670ed19386f48798c6b"
  },
  {
    "url": "windowsphone-appicon-44-44.f083de53.png",
    "revision": "ab1230f94b5aa6d54fa5e1b5475c5ccb"
  },
  {
    "url": "windowsphone-appicon-62-62.8105a91c.png",
    "revision": "668b0f7c9721ab4367dfe5f10b8fa6a1"
  },
  {
    "url": "windowsphone-mediumtile-150-150.53d55e74.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "windowsphone-mediumtile-210-210.7217d525.png",
    "revision": "90da731d3a004e678384ff6e6ba87dca"
  },
  {
    "url": "windowsphone-mediumtile-360-360.6a5c9293.png",
    "revision": "70be75d867d76a7d6b478616c1c7d871"
  },
  {
    "url": "windowsphone-smalltile-170-170.7eda2414.png",
    "revision": "ffbacfe6b33109532e1116b78cbb4d33"
  },
  {
    "url": "windowsphone-smalltile-71-71.0d75ccfd.png",
    "revision": "f9cb3b5ca47270d5ceb38248978cc78d"
  },
  {
    "url": "windowsphone-smalltile-99-99.003e5c87.png",
    "revision": "6fd9e3d4b218f0d825697b2e8647c670"
  },
  {
    "url": "windowsphone-storelogo-120-120.e192ee31.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "windowsphone-storelogo-50-50.c67214a9.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "windowsphone-storelogo-70-70.f04808da.png",
    "revision": "bc81d3a1b3d723bdeab2371213aa3d98"
  }
]);


  console.log("made it to end of workbox setup");
} else {
  console.log("Boo! Workbox didn't load 😬");
}
