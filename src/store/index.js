import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import meme from "./meme.module";
import notification from "./notification.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, meme, notification }
});
