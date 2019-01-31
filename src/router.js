import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Leaderboard from "./views/Leaderboard.vue";
import Explore from "./views/Explore.vue";
import Settings from "./views/Settings.vue";
import Login from "./views/Login.vue";
import Meta from "vue-meta";

Vue.use(Meta);
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      component: Leaderboard
    },
    {
      path: "/r/:subreddit?",
      name: "explore",
      component: Explore
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
