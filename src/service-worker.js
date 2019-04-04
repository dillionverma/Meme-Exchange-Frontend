/* global workbox */

workbox.core.setCacheNameDetails({ prefix: "Meme_Exchange" });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// https://developers.google.com/web/tools/workbox/

// Possibly migrate to this in future
// https://stackoverflow.com/questions/51668779/how-to-cache-api-and-assets-in-service-worker-in-vue-cli3
// https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config
workbox.routing.registerRoute(
  new RegExp("https://oauth.reddit.com/(.*)"),
  new workbox.strategies.NetworkFirst({
    cacheName: "reddit-api",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 200,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );

workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "google-api",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

self.addEventListener("message", e => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case "skipWaiting":
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});
