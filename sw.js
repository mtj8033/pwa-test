// This file will be used to generate the sw.js file
// pull in workbox
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

if (workbox) {
  console.log("Yay! Workbox is loaded 🎉!!");

  //injected by workbox-cli based on workbox-config.js
  workbox.precaching.precacheAndRoute([
  {
    "url": "android-launchericon-144-144.994549c2.png",
    "revision": "654d6ab7d81fcee9d989b022975ab0cf"
  },
  {
    "url": "android-launchericon-192-192.a06de5e5.png",
    "revision": "74dfa8d8400b6f9a40f34d4acd9ca3dd"
  },
  {
    "url": "android-launchericon-48-48.3e0bfec1.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "android-launchericon-512-512.48b763bc.png",
    "revision": "3fd645e8fb94c99aa169a90be8ce40d1"
  },
  {
    "url": "android-launchericon-72-72.3493c2bd.png",
    "revision": "1b22bccaea7f2dec92c68e418017f8f4"
  },
  {
    "url": "android-launchericon-96-96.a81f5f33.png",
    "revision": "9de36c4d3899e2663ca6807d57e5deb9"
  },
  {
    "url": "chrome-extensionmanagementpage-48-48.3a56a90e.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "chrome-favicon-16-16.107b3013.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "chrome-installprocess-128-128.a2849555.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-general-128-128.5108bfe6.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-general-16-16.6105aea3.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "firefox-general-256-256.56cf8715.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "firefox-general-32-32.f1346301.png",
    "revision": "148f2e55a4b90b6a2b6cedda64ee000c"
  },
  {
    "url": "firefox-general-48-48.3a4d4eca.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "firefox-general-64-64.35d181fc.png",
    "revision": "2718a87e5578e3d1ec3a29e6015ee257"
  },
  {
    "url": "firefox-general-90-90.8460bf94.png",
    "revision": "eeb0aa126a37f1f5b9ae454b2ff8ddf6"
  },
  {
    "url": "firefox-marketplace-128-128.710957cd.png",
    "revision": "02960acb4aff97b02f344cc0e57b4aef"
  },
  {
    "url": "firefox-marketplace-512-512.5f3c58da.png",
    "revision": "3fd645e8fb94c99aa169a90be8ce40d1"
  },
  {
    "url": "index.html",
    "revision": "0825f69afd789b1aa40a7704ef5d7dd2"
  },
  {
    "url": "index.js",
    "revision": "8043dfaa7284cd35cc580c315d289e4b"
  },
  {
    "url": "ios-appicon-1024-1024.f31456ce.png",
    "revision": "181114a631c8ff07698f3417c291c5f6"
  },
  {
    "url": "ios-appicon-120-120.2bc563c1.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "ios-appicon-152-152.c3437d48.png",
    "revision": "014350ce4338c3a0ab817c84ede0a758"
  },
  {
    "url": "ios-appicon-180-180.0ef70f66.png",
    "revision": "4c59131aa1f909aa5cb24839256f3402"
  },
  {
    "url": "ios-appicon-76-76.ee165496.png",
    "revision": "a08e147f2e9d4c2f51e4fe7bea56f4a6"
  },
  {
    "url": "ios-launchimage-1024-768.b7ac1d52.png",
    "revision": "0331bf2cd9084fb2096d62ef2da9bb0f"
  },
  {
    "url": "ios-launchimage-1242-2208.7d46a81f.png",
    "revision": "a1f244ee2f987a5537097096b07d5627"
  },
  {
    "url": "ios-launchimage-1334-750.388a2ee4.png",
    "revision": "a82e8cefc519cc3b33837c5f615c5f9d"
  },
  {
    "url": "ios-launchimage-1536-2048.e3c877ce.png",
    "revision": "d5be3cb22df1a0fecb6c40ca4db1e41a"
  },
  {
    "url": "ios-launchimage-2048-1536.b57b48cc.png",
    "revision": "ae3a0eafe06cfffd619c13f583ba80df"
  },
  {
    "url": "ios-launchimage-2208-1242.7dbf4223.png",
    "revision": "732bf847405283136469c4b7d3c42c8d"
  },
  {
    "url": "ios-launchimage-640-1136.1752bb85.png",
    "revision": "fd84c99eb60528ebd7cf0fc336e7e568"
  },
  {
    "url": "ios-launchimage-640-960.a48ec8f3.png",
    "revision": "b93d905264553c039c68bf8351f18fa0"
  },
  {
    "url": "ios-launchimage-750-1334.81de5cd8.png",
    "revision": "984733ad775eba416ecfca6f6f6a96f3"
  },
  {
    "url": "ios-launchimage-768-1024.335dcddc.png",
    "revision": "608dda8fb0743480fab91e0794225917"
  },
  {
    "url": "main.1f19ae8e.js",
    "revision": "de7e37a0b68a013473c53eed808db42d"
  },
  {
    "url": "main.af46ece4.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "main.af46ece4.js",
    "revision": "8043dfaa7284cd35cc580c315d289e4b"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "32c31df60ce269539fb31a34024f4c03"
  },
  {
    "url": "SplashScreen.scale-100.b7c717a5.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "SplashScreen.scale-125.34dc0b60.png",
    "revision": "940187501e0310fafd3a61a78460d1b9"
  },
  {
    "url": "SplashScreen.scale-150.e57d8eb9.png",
    "revision": "069dc41bc4e70d59a4ad2fa0017ff139"
  },
  {
    "url": "SplashScreen.scale-200.232a62f4.png",
    "revision": "0013a41c9abc723d90c37a5b324e3349"
  },
  {
    "url": "SplashScreen.scale-400.c400f29e.png",
    "revision": "9efc975e9e118c2ab00213354cc83c05"
  },
  {
    "url": "Square150x150Logo.scale-100.1fccbcc7.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "Square150x150Logo.scale-125.90af7ae5.png",
    "revision": "86d014e9eaaa76f4a57f59f2a8d8454e"
  },
  {
    "url": "Square150x150Logo.scale-150.e92833bc.png",
    "revision": "5c609f98678be5245f311e90b1cc2bb5"
  },
  {
    "url": "Square150x150Logo.scale-200.3ca1a144.png",
    "revision": "d471ce20333e7bf987f19b69035723c5"
  },
  {
    "url": "Square150x150Logo.scale-400.1093ff65.png",
    "revision": "6e0c3e5def82da02e8cd4e0901ca8be6"
  },
  {
    "url": "Square310x310Logo.scale-100.b911b0c7.png",
    "revision": "6668675ffe51e27a940dd6cc34d73292"
  },
  {
    "url": "Square310x310Logo.scale-125.527bca76.png",
    "revision": "e7a1851dd2e75d86da6793bd3cd11644"
  },
  {
    "url": "Square310x310Logo.scale-150.80ea65ea.png",
    "revision": "5389e1107fca97af1cea3556a19ab0f1"
  },
  {
    "url": "Square310x310Logo.scale-200.03645ba8.png",
    "revision": "692f7d5f8757066133f43eb31d6e2339"
  },
  {
    "url": "Square310x310Logo.scale-400.3215d8d9.png",
    "revision": "84fdc47f503cb4280778edcb6b335112"
  },
  {
    "url": "Square44x44Logo.scale-100.9a44e5df.png",
    "revision": "ab1230f94b5aa6d54fa5e1b5475c5ccb"
  },
  {
    "url": "Square44x44Logo.scale-125.0866ba15.png",
    "revision": "405972578d12d2b0b79af09e163b8888"
  },
  {
    "url": "Square44x44Logo.scale-150.bacae833.png",
    "revision": "67d2903c2833f3ed4b6aeaa1f0659dfb"
  },
  {
    "url": "Square44x44Logo.scale-200.500cff2d.png",
    "revision": "7a2febc967df7065d2219735ba0b8ca8"
  },
  {
    "url": "Square44x44Logo.scale-400.31cc5a31.png",
    "revision": "0bc258e8f0d3b564187a0e33e2e9380c"
  },
  {
    "url": "Square44x44Logo.targetsize-16_altform-unplated.16a7944b.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "Square44x44Logo.targetsize-16.fbbc5478.png",
    "revision": "0fbb795f3f5a1df41ff1f928b3c83856"
  },
  {
    "url": "Square44x44Logo.targetsize-24_altform-unplated.89504922.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "Square44x44Logo.targetsize-24.29c199f7.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "Square44x44Logo.targetsize-256_altform-unplated.74ebfad6.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "Square44x44Logo.targetsize-256.530029fb.png",
    "revision": "f527522ac11b74f906d7109cc9e6cca2"
  },
  {
    "url": "Square44x44Logo.targetsize-48_altform-unplated.ffb29e45.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "Square44x44Logo.targetsize-48.fc1ab9f0.png",
    "revision": "11939cc60ee84423a20e88b6fa243bc6"
  },
  {
    "url": "Square71x71Logo.scale-100.d3a9d5e5.png",
    "revision": "f9cb3b5ca47270d5ceb38248978cc78d"
  },
  {
    "url": "Square71x71Logo.scale-125.191be1ef.png",
    "revision": "6f6ca1537e52e6f4c7b8a849cdbfbf0e"
  },
  {
    "url": "Square71x71Logo.scale-150.e6bca1b1.png",
    "revision": "7fe0fb4ec9aec15149911c9be1ab33f9"
  },
  {
    "url": "Square71x71Logo.scale-200.6f068f7b.png",
    "revision": "c9d8e04595b317580c73bf360e5209bb"
  },
  {
    "url": "Square71x71Logo.scale-400.bc9da1c3.png",
    "revision": "74d728155896d866b034b7d32f6438fd"
  },
  {
    "url": "StoreLogo.b780c076.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "StoreLogo.scale-100.ee291ec8.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "StoreLogo.scale-125.fcc06117.png",
    "revision": "f7ba29e393573da52ff94a9b61bc2817"
  },
  {
    "url": "StoreLogo.scale-150.b035b321.png",
    "revision": "07a6c9f46d1710ba7dd4075e9e136bf7"
  },
  {
    "url": "StoreLogo.scale-200.1be45875.png",
    "revision": "4d1871062d41c3078ad494372b9f42fb"
  },
  {
    "url": "StoreLogo.scale-400.b74ea5ab.png",
    "revision": "a49727068bee66d1ba2a4e68650d5830"
  },
  {
    "url": "Wide310x150Logo.scale-100.dd8aba39.png",
    "revision": "facfda60774acfc95676c69bd9afa1d8"
  },
  {
    "url": "Wide310x150Logo.scale-125.86159b48.png",
    "revision": "59013fa60b22b18d751d5f6c7b5a6e71"
  },
  {
    "url": "Wide310x150Logo.scale-150.67550d31.png",
    "revision": "09562ef3f5f8d01846e6b47760a10156"
  },
  {
    "url": "Wide310x150Logo.scale-200.fcca53a3.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "Wide310x150Logo.scale-400.ec7eb791.png",
    "revision": "0013a41c9abc723d90c37a5b324e3349"
  },
  {
    "url": "windows-smallsquare-24-24.e0c19792.png",
    "revision": "e603a64eac1bdb2b67c18732aea4dff2"
  },
  {
    "url": "windows-smallsquare-30-30.6b98d08c.png",
    "revision": "383fe36ddeb19cec955452bab211bfe2"
  },
  {
    "url": "windows-smallsquare-42-42.e2939ff9.png",
    "revision": "94ba08ea93cd0898f23b00e855d9a0cd"
  },
  {
    "url": "windows-smallsquare-54-54.fd4d5f21.png",
    "revision": "a8bf8130eaf64e9fcccc956d2d60783a"
  },
  {
    "url": "windows-splashscreen-1116-540.f686bf97.png",
    "revision": "a95417213dab978aa92417473f5d509a"
  },
  {
    "url": "windows-splashscreen-620-300.3aed82b7.png",
    "revision": "143679e283864c88929870b737740c97"
  },
  {
    "url": "windows-splashscreen-868-420.6675530c.png",
    "revision": "25919c2b956aae0aa14cb0f4f97ba928"
  },
  {
    "url": "windows-squarelogo-120-120.fbc4a74a.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "windows-squarelogo-150-150.2db58b6a.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "windows-squarelogo-210-210.21208179.png",
    "revision": "90da731d3a004e678384ff6e6ba87dca"
  },
  {
    "url": "windows-squarelogo-270-270.650b9676.png",
    "revision": "f9cce64bf6a5ff05275f7198244a51c9"
  },
  {
    "url": "windows-storelogo-50-50.0496abe1.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "windows-storelogo-70-70.56c318b7.png",
    "revision": "bc81d3a1b3d723bdeab2371213aa3d98"
  },
  {
    "url": "windows-storelogo-90-90.e06ad3a9.png",
    "revision": "eeb0aa126a37f1f5b9ae454b2ff8ddf6"
  },
  {
    "url": "windowsphone-appicon-106-106.12a7242c.png",
    "revision": "544827c0923d9670ed19386f48798c6b"
  },
  {
    "url": "windowsphone-appicon-44-44.eabf83fa.png",
    "revision": "ab1230f94b5aa6d54fa5e1b5475c5ccb"
  },
  {
    "url": "windowsphone-appicon-62-62.5fcfde6e.png",
    "revision": "668b0f7c9721ab4367dfe5f10b8fa6a1"
  },
  {
    "url": "windowsphone-mediumtile-150-150.50d690e4.png",
    "revision": "cf179e4150c7782723d04777103931bb"
  },
  {
    "url": "windowsphone-mediumtile-210-210.5a950faa.png",
    "revision": "90da731d3a004e678384ff6e6ba87dca"
  },
  {
    "url": "windowsphone-mediumtile-360-360.f0240278.png",
    "revision": "70be75d867d76a7d6b478616c1c7d871"
  },
  {
    "url": "windowsphone-smalltile-170-170.f37fee1a.png",
    "revision": "ffbacfe6b33109532e1116b78cbb4d33"
  },
  {
    "url": "windowsphone-smalltile-71-71.049af265.png",
    "revision": "f9cb3b5ca47270d5ceb38248978cc78d"
  },
  {
    "url": "windowsphone-smalltile-99-99.e9f29004.png",
    "revision": "6fd9e3d4b218f0d825697b2e8647c670"
  },
  {
    "url": "windowsphone-storelogo-120-120.ceddf679.png",
    "revision": "2306c901f9eee653d911ca6607087943"
  },
  {
    "url": "windowsphone-storelogo-50-50.603e1b33.png",
    "revision": "135788c3139b03eca665066c61030c63"
  },
  {
    "url": "windowsphone-storelogo-70-70.13bb1c16.png",
    "revision": "bc81d3a1b3d723bdeab2371213aa3d98"
  }
]);

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
    new RegExp("https://cdn.jsdelivr.net/npm/.*\\.(js|css)$"),
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
    new RegExp("^http.?://jsonplaceholder.typicode.com/todos"),
    new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    "POST"
  );

} else {
  console.log("Boo! Workbox didn't load 😬");
}
