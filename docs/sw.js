parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"NqYy":[function(require,module,exports) {
if(importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js"),workbox){console.log("Yay! Workbox is loaded 🎉!!"),workbox.precaching.precacheAndRoute([{url:"icons/android/android-launchericon-144-144.png",revision:"654d6ab7d81fcee9d989b022975ab0cf"},{url:"icons/android/android-launchericon-192-192.png",revision:"74dfa8d8400b6f9a40f34d4acd9ca3dd"},{url:"icons/android/android-launchericon-48-48.png",revision:"11939cc60ee84423a20e88b6fa243bc6"},{url:"icons/android/android-launchericon-512-512.png",revision:"3fd645e8fb94c99aa169a90be8ce40d1"},{url:"icons/android/android-launchericon-72-72.png",revision:"1b22bccaea7f2dec92c68e418017f8f4"},{url:"icons/android/android-launchericon-96-96.png",revision:"9de36c4d3899e2663ca6807d57e5deb9"},{url:"icons/chrome/chrome-extensionmanagementpage-48-48.png",revision:"11939cc60ee84423a20e88b6fa243bc6"},{url:"icons/chrome/chrome-favicon-16-16.png",revision:"0fbb795f3f5a1df41ff1f928b3c83856"},{url:"icons/chrome/chrome-installprocess-128-128.png",revision:"02960acb4aff97b02f344cc0e57b4aef"},{url:"icons/firefox/firefox-general-128-128.png",revision:"02960acb4aff97b02f344cc0e57b4aef"},{url:"icons/firefox/firefox-general-16-16.png",revision:"0fbb795f3f5a1df41ff1f928b3c83856"},{url:"icons/firefox/firefox-general-256-256.png",revision:"f527522ac11b74f906d7109cc9e6cca2"},{url:"icons/firefox/firefox-general-32-32.png",revision:"148f2e55a4b90b6a2b6cedda64ee000c"},{url:"icons/firefox/firefox-general-48-48.png",revision:"11939cc60ee84423a20e88b6fa243bc6"},{url:"icons/firefox/firefox-general-64-64.png",revision:"2718a87e5578e3d1ec3a29e6015ee257"},{url:"icons/firefox/firefox-general-90-90.png",revision:"eeb0aa126a37f1f5b9ae454b2ff8ddf6"},{url:"icons/firefox/firefox-marketplace-128-128.png",revision:"02960acb4aff97b02f344cc0e57b4aef"},{url:"icons/firefox/firefox-marketplace-512-512.png",revision:"3fd645e8fb94c99aa169a90be8ce40d1"},{url:"icons/ios/ios-appicon-1024-1024.png",revision:"181114a631c8ff07698f3417c291c5f6"},{url:"icons/ios/ios-appicon-120-120.png",revision:"2306c901f9eee653d911ca6607087943"},{url:"icons/ios/ios-appicon-152-152.png",revision:"014350ce4338c3a0ab817c84ede0a758"},{url:"icons/ios/ios-appicon-180-180.png",revision:"4c59131aa1f909aa5cb24839256f3402"},{url:"icons/ios/ios-appicon-76-76.png",revision:"a08e147f2e9d4c2f51e4fe7bea56f4a6"},{url:"icons/ios/ios-launchimage-1024-768.png",revision:"0331bf2cd9084fb2096d62ef2da9bb0f"},{url:"icons/ios/ios-launchimage-1242-2208.png",revision:"a1f244ee2f987a5537097096b07d5627"},{url:"icons/ios/ios-launchimage-1334-750.png",revision:"a82e8cefc519cc3b33837c5f615c5f9d"},{url:"icons/ios/ios-launchimage-1536-2048.png",revision:"d5be3cb22df1a0fecb6c40ca4db1e41a"},{url:"icons/ios/ios-launchimage-2048-1536.png",revision:"ae3a0eafe06cfffd619c13f583ba80df"},{url:"icons/ios/ios-launchimage-2208-1242.png",revision:"732bf847405283136469c4b7d3c42c8d"},{url:"icons/ios/ios-launchimage-640-1136.png",revision:"fd84c99eb60528ebd7cf0fc336e7e568"},{url:"icons/ios/ios-launchimage-640-960.png",revision:"b93d905264553c039c68bf8351f18fa0"},{url:"icons/ios/ios-launchimage-750-1334.png",revision:"984733ad775eba416ecfca6f6f6a96f3"},{url:"icons/ios/ios-launchimage-768-1024.png",revision:"608dda8fb0743480fab91e0794225917"},{url:"icons/windows/windows-smallsquare-24-24.png",revision:"e603a64eac1bdb2b67c18732aea4dff2"},{url:"icons/windows/windows-smallsquare-30-30.png",revision:"383fe36ddeb19cec955452bab211bfe2"},{url:"icons/windows/windows-smallsquare-42-42.png",revision:"94ba08ea93cd0898f23b00e855d9a0cd"},{url:"icons/windows/windows-smallsquare-54-54.png",revision:"a8bf8130eaf64e9fcccc956d2d60783a"},{url:"icons/windows/windows-splashscreen-1116-540.png",revision:"a95417213dab978aa92417473f5d509a"},{url:"icons/windows/windows-splashscreen-620-300.png",revision:"143679e283864c88929870b737740c97"},{url:"icons/windows/windows-splashscreen-868-420.png",revision:"25919c2b956aae0aa14cb0f4f97ba928"},{url:"icons/windows/windows-squarelogo-120-120.png",revision:"2306c901f9eee653d911ca6607087943"},{url:"icons/windows/windows-squarelogo-150-150.png",revision:"cf179e4150c7782723d04777103931bb"},{url:"icons/windows/windows-squarelogo-210-210.png",revision:"90da731d3a004e678384ff6e6ba87dca"},{url:"icons/windows/windows-squarelogo-270-270.png",revision:"f9cce64bf6a5ff05275f7198244a51c9"},{url:"icons/windows/windows-storelogo-50-50.png",revision:"135788c3139b03eca665066c61030c63"},{url:"icons/windows/windows-storelogo-70-70.png",revision:"bc81d3a1b3d723bdeab2371213aa3d98"},{url:"icons/windows/windows-storelogo-90-90.png",revision:"eeb0aa126a37f1f5b9ae454b2ff8ddf6"},{url:"icons/windows/windowsphone-appicon-106-106.png",revision:"544827c0923d9670ed19386f48798c6b"},{url:"icons/windows/windowsphone-appicon-44-44.png",revision:"ab1230f94b5aa6d54fa5e1b5475c5ccb"},{url:"icons/windows/windowsphone-appicon-62-62.png",revision:"668b0f7c9721ab4367dfe5f10b8fa6a1"},{url:"icons/windows/windowsphone-mediumtile-150-150.png",revision:"cf179e4150c7782723d04777103931bb"},{url:"icons/windows/windowsphone-mediumtile-210-210.png",revision:"90da731d3a004e678384ff6e6ba87dca"},{url:"icons/windows/windowsphone-mediumtile-360-360.png",revision:"70be75d867d76a7d6b478616c1c7d871"},{url:"icons/windows/windowsphone-smalltile-170-170.png",revision:"ffbacfe6b33109532e1116b78cbb4d33"},{url:"icons/windows/windowsphone-smalltile-71-71.png",revision:"f9cb3b5ca47270d5ceb38248978cc78d"},{url:"icons/windows/windowsphone-smalltile-99-99.png",revision:"6fd9e3d4b218f0d825697b2e8647c670"},{url:"icons/windows/windowsphone-storelogo-120-120.png",revision:"2306c901f9eee653d911ca6607087943"},{url:"icons/windows/windowsphone-storelogo-50-50.png",revision:"135788c3139b03eca665066c61030c63"},{url:"icons/windows/windowsphone-storelogo-70-70.png",revision:"bc81d3a1b3d723bdeab2371213aa3d98"},{url:"icons/windows10/SplashScreen.scale-100.png",revision:"143679e283864c88929870b737740c97"},{url:"icons/windows10/SplashScreen.scale-125.png",revision:"940187501e0310fafd3a61a78460d1b9"},{url:"icons/windows10/SplashScreen.scale-150.png",revision:"069dc41bc4e70d59a4ad2fa0017ff139"},{url:"icons/windows10/SplashScreen.scale-200.png",revision:"0013a41c9abc723d90c37a5b324e3349"},{url:"icons/windows10/SplashScreen.scale-400.png",revision:"9efc975e9e118c2ab00213354cc83c05"},{url:"icons/windows10/Square150x150Logo.scale-100.png",revision:"cf179e4150c7782723d04777103931bb"},{url:"icons/windows10/Square150x150Logo.scale-125.png",revision:"86d014e9eaaa76f4a57f59f2a8d8454e"},{url:"icons/windows10/Square150x150Logo.scale-150.png",revision:"5c609f98678be5245f311e90b1cc2bb5"},{url:"icons/windows10/Square150x150Logo.scale-200.png",revision:"d471ce20333e7bf987f19b69035723c5"},{url:"icons/windows10/Square150x150Logo.scale-400.png",revision:"6e0c3e5def82da02e8cd4e0901ca8be6"},{url:"icons/windows10/Square310x310Logo.scale-100.png",revision:"6668675ffe51e27a940dd6cc34d73292"},{url:"icons/windows10/Square310x310Logo.scale-125.png",revision:"e7a1851dd2e75d86da6793bd3cd11644"},{url:"icons/windows10/Square310x310Logo.scale-150.png",revision:"5389e1107fca97af1cea3556a19ab0f1"},{url:"icons/windows10/Square310x310Logo.scale-200.png",revision:"692f7d5f8757066133f43eb31d6e2339"},{url:"icons/windows10/Square310x310Logo.scale-400.png",revision:"84fdc47f503cb4280778edcb6b335112"},{url:"icons/windows10/Square44x44Logo.scale-100.png",revision:"ab1230f94b5aa6d54fa5e1b5475c5ccb"},{url:"icons/windows10/Square44x44Logo.scale-125.png",revision:"405972578d12d2b0b79af09e163b8888"},{url:"icons/windows10/Square44x44Logo.scale-150.png",revision:"67d2903c2833f3ed4b6aeaa1f0659dfb"},{url:"icons/windows10/Square44x44Logo.scale-200.png",revision:"7a2febc967df7065d2219735ba0b8ca8"},{url:"icons/windows10/Square44x44Logo.scale-400.png",revision:"0bc258e8f0d3b564187a0e33e2e9380c"},{url:"icons/windows10/Square44x44Logo.targetsize-16_altform-unplated.png",revision:"0fbb795f3f5a1df41ff1f928b3c83856"},{url:"icons/windows10/Square44x44Logo.targetsize-16.png",revision:"0fbb795f3f5a1df41ff1f928b3c83856"},{url:"icons/windows10/Square44x44Logo.targetsize-24_altform-unplated.png",revision:"e603a64eac1bdb2b67c18732aea4dff2"},{url:"icons/windows10/Square44x44Logo.targetsize-24.png",revision:"e603a64eac1bdb2b67c18732aea4dff2"},{url:"icons/windows10/Square44x44Logo.targetsize-256_altform-unplated.png",revision:"f527522ac11b74f906d7109cc9e6cca2"},{url:"icons/windows10/Square44x44Logo.targetsize-256.png",revision:"f527522ac11b74f906d7109cc9e6cca2"},{url:"icons/windows10/Square44x44Logo.targetsize-48_altform-unplated.png",revision:"11939cc60ee84423a20e88b6fa243bc6"},{url:"icons/windows10/Square44x44Logo.targetsize-48.png",revision:"11939cc60ee84423a20e88b6fa243bc6"},{url:"icons/windows10/Square71x71Logo.scale-100.png",revision:"f9cb3b5ca47270d5ceb38248978cc78d"},{url:"icons/windows10/Square71x71Logo.scale-125.png",revision:"6f6ca1537e52e6f4c7b8a849cdbfbf0e"},{url:"icons/windows10/Square71x71Logo.scale-150.png",revision:"7fe0fb4ec9aec15149911c9be1ab33f9"},{url:"icons/windows10/Square71x71Logo.scale-200.png",revision:"c9d8e04595b317580c73bf360e5209bb"},{url:"icons/windows10/Square71x71Logo.scale-400.png",revision:"74d728155896d866b034b7d32f6438fd"},{url:"icons/windows10/StoreLogo.png",revision:"135788c3139b03eca665066c61030c63"},{url:"icons/windows10/StoreLogo.scale-100.png",revision:"135788c3139b03eca665066c61030c63"},{url:"icons/windows10/StoreLogo.scale-125.png",revision:"f7ba29e393573da52ff94a9b61bc2817"},{url:"icons/windows10/StoreLogo.scale-150.png",revision:"07a6c9f46d1710ba7dd4075e9e136bf7"},{url:"icons/windows10/StoreLogo.scale-200.png",revision:"4d1871062d41c3078ad494372b9f42fb"},{url:"icons/windows10/StoreLogo.scale-400.png",revision:"a49727068bee66d1ba2a4e68650d5830"},{url:"icons/windows10/Wide310x150Logo.scale-100.png",revision:"facfda60774acfc95676c69bd9afa1d8"},{url:"icons/windows10/Wide310x150Logo.scale-125.png",revision:"59013fa60b22b18d751d5f6c7b5a6e71"},{url:"icons/windows10/Wide310x150Logo.scale-150.png",revision:"09562ef3f5f8d01846e6b47760a10156"},{url:"icons/windows10/Wide310x150Logo.scale-200.png",revision:"143679e283864c88929870b737740c97"},{url:"icons/windows10/Wide310x150Logo.scale-400.png",revision:"0013a41c9abc723d90c37a5b324e3349"},{url:"index.html",revision:"7bb276f9499dd6846b015ea729ad461e"},{url:"main.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"main.js",revision:"e3f75872210d64d4a63dfa786ccd4245"},{url:"manifest.webmanifest",revision:"3b5ad5e9247f9d1b8247d03af0c9e8c3"},{url:"setupIndexedDB.js",revision:"893a3c72af8d5d33b276565d9cecd2ad"},{url:"setupServiceWorker.js",revision:"b97b49bda6acd9f88e9634b66f8b647e"}]),workbox.core.setCacheNameDetails({prefix:"pwa-test",suffix:"v1"}),workbox.routing.registerRoute(/\.js/,new workbox.strategies.NetworkFirst),workbox.routing.registerRoute(/\.css/,new workbox.strategies.StaleWhileRevalidate({cacheName:"css-cache"})),workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,new workbox.strategies.CacheFirst({cacheName:"image-cache",plugins:[new workbox.expiration.Plugin({maxEntries:20,maxAgeSeconds:604800})]})),workbox.routing.registerRoute(new RegExp("https://cdn.jsdelivr.net/npm/.*\\.(js|css)$"),new workbox.strategies.StaleWhileRevalidate({cacheName:"jsdelivr",plugins:[new workbox.expiration.Plugin({maxEntries:10,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]}));var e=new workbox.backgroundSync.Plugin("pwaTestQueue",{maxRetentionTime:1440,callbacks:{requestWillEnqueue:function(e){console.log("will enqueue",e)},requestWillReplay:function(e){console.log("will replay",e)},queueDidReplay:function(e){console.log("replaying queue",e)}}});workbox.routing.registerRoute(new RegExp("^http.?://jsonplaceholder.typicode.com/todos"),new workbox.strategies.NetworkOnly({plugins:[e]}),"POST")}else console.log("Boo! Workbox didn't load 😬");
},{}]},{},["NqYy"], null)
//# sourceMappingURL=/pwa-test/sw.map