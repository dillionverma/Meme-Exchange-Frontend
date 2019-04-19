import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/axios";
import "./plugins/fb-sdk";
import "./plugins/reddit";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAnalytics from "vue-analytics";
import VueApexCharts from "vue-apexcharts";

const isProd = process.env.NODE_ENV === "production";

Vue.use(VueApexCharts);
Vue.use(VueAnalytics, {
  id: "UA-136760556-1",
  router,
  store,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd // don't track google analytics on development
  }
});

Vue.prototype.vibrate = () =>
  "vibrate" in navigator ? navigator.vibrate(25) : null;

Vue.config.productionTip = false;

Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
