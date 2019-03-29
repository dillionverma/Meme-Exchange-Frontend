import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/axios";
import "./plugins/fb-sdk";
import "./plugins/reddit";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from "vue-moment";
import VueAnalytics from "vue-analytics";

const isProd = process.env.NODE_ENV === "production"


Vue.use(VueAnalytics, {
  id: "UA-136760556-1",
  router,
  store,
  debug: {
    enabled: !isProd,
  }
});

moment.suppressDeprecationWarnings = true;
Vue.use(moment);

Vue.prototype.vibrate = () =>
  "vibrate" in navigator ? navigator.vibrate(50) : null;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
