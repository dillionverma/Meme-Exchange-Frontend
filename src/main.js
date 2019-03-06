import Vue from "vue";
import "./plugins/axios";
import "./plugins/vuetify";
import "./plugins/fb-sdk";
import "./plugins/reddit";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import moment from "vue-moment";

moment.suppressDeprecationWarnings = true;
Vue.use(moment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
