/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered(registration) {
      // Dispatch event to be used by Settings.vue
      document.dispatchEvent(
        new CustomEvent("swRegistered", { detail: registration })
      );
      console.log("Service worker has been registered.");
      // Routinely check for app updates by testing for a new service worker.
      setInterval(() => {
        registration.update();
      }, 1000 * 60 * 60); // hourly checks
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated(registration) {
      // Dispatch event to be used by UpdateNotification.vue
      document.dispatchEvent(
        new CustomEvent("swUpdated", { detail: registration })
      );
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
