import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth.module";
import meme from "./meme.module";
import notification from "./notification.module";
import leaderboard from "./leaderboard.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, meme, notification, leaderboard }
});
