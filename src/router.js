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
      component: () =>
        import(/* webpackChunkName: "home", webpackPreload: true */ "./views/Home.vue")
    },
    {
      path: "/leaderboard",
      name: "Leaderboard",
      component: () =>
        import(/* webpackChunkName: "leaderboard", webpackPreload: true */ "./views/Leaderboard.vue")
    },
    {
      path: "/user/:username",
      name: "User",
      component: () =>
        import(/* webpackChunkName: "user", webpackPreload: true */ "./views/User.vue")
    },
    {
      path: "/r/:subreddit?",
      name: "explore",
      component: () =>
        import(/* webpackChunkName: "explore", webpackPreload: true */ "./views/Explore.vue")
    },
    {
      path: "/r/:subreddit/:reddit_id",
      name: "Meme",
      component: () =>
        import(/* webpackChunkName: "meme", webpackPreload: true */ "./views/Meme.vue")
    },
    {
      path: "/settings",
      name: "Settings",
      component: () =>
        import(/* webpackChunkName: "settings", webpackPreload: true */ "./views/Settings.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about", webpackPreload: true */ "./views/About.vue")
    }
  ]
});
