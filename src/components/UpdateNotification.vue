<template>
  <v-snackbar
    v-model="snackWithButtons"
    :timeout="timeout"
    bottom
    :style="snackStyle"
  >
    {{ snackWithBtnText }}
    <v-spacer />
    <v-btn dark text color="primary" @click.native="refreshApp">
      {{ snackBtnText }}
    </v-btn>
    <v-btn icon @click="snackWithButtons = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: "Refresh",
      snackWithBtnText: "New version available!",
      snackWithButtons: false,
      timeout: 0
    };
  },
  computed: {
    snackStyle() {
      return {
        "--snack-bottom": !this.$vuetify.breakpoint.lgAndUp ? "65px" : "10px",
        "z-index": !this.$vuetify.breakpoint.lgAndUp ? 4 : 5
      };
    }
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
  },
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      // triggers the service worker to change and thus triggers controllerchange
      // event which gets handled above
      this.registration.waiting.postMessage("skipWaiting");
    }
  }
};
</script>
