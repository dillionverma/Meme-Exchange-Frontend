import Vue from "vue";
import Router from "vue-router";
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
      component: () => import("./views/Home.vue")
    },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      component: () => import("./views/Leaderboard.vue")
    },
    {
      path: "/user",
      name: "User",
      component: () => import("./views/User.vue")
    },
    {
      path: "/r/:subreddit?",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () => import("./views/Settings.vue")
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
