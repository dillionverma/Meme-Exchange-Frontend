import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

Vue.use(Meta);
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // Used to set scroll behaviour when user clicks back on browser
    return new Promise(resolve => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ x: 0, y: 0 });
        }
      }, 300);
    });
  },
  routes: [
    {
      path: "/",
      name: "explore",
      component: () =>
        import(/* webpackChunkName: "home", webpackPreload: true */ "./views/Explore.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard", webpackPreload: true */ "./views/Dashboard.vue")
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
      component: () =>
        import(/* webpackChunkName: "about", webpackPreload: true */ "./views/About.vue")
    },
    {
      path: "/feedback",
      name: "feedback",
      component: () =>
        import(/* webpackChunkName: "feedback", webpackPreload: true */ "./views/Feedback.vue")
    },
    {
      path: "/help",
      name: "help",
      component: () =>
        import(/* webpackChunkName: "about", webpackPreload: true */ "./views/Help.vue")
    }
  ]
});
