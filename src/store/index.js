import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth.module";
import meme from "@/store/meme.module";
import notification from "@/store/notification.module";
import leaderboard from "@/store/leaderboard.module";
import user from "@/store/user.module";
import app from "@/store/app.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, auth, meme, notification, leaderboard, user }
});
