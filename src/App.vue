<template>
  <v-app :dark="dark">
    <Drawer :handleAuthClick="handleAuthClick" :authText="authText" />
    <TopNav :handleAuthClick="handleAuthClick" :authText="authText" />
    <v-content>
      <v-container fluid fill-height>
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
        <Notification />
        <UpdateNotification />
      </v-container>
    </v-content>
    <BottomNav />
    <!-- <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn> -->
    <v-dialog v-model="loginDialog" width="400px">
      <Login />
    </v-dialog>
    <v-dialog v-model="usernameDialog" width="400px">
      <Username />
    </v-dialog>
    <v-dialog v-model="shareDialog" width="400px">
      <Share />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import JwtService from "@/lib/jwt.service";
import Login from "@/components/Login";
import Share from "@/components/Meme.Share";
import Username from "@/components/Username";
import Drawer from "@/components/Drawer";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import Notification from "@/components/Notification";
import UpdateNotification from "@/components/UpdateNotification";
import {
  AUTOMATIC_LOGIN,
  AUTHENTICATE,
  LOGOUT,
  LOGOUT_GOOGLE,
  LOGOUT_FACEBOOK
} from "@/store/auth.module";
import {
  LOGIN_DIALOG,
  USERNAME_DIALOG,
  SHARE_DIALOG
} from "@/store/app.module";

export default {
  mounted() {
    if (!this.isLoggedIn && JwtService.getToken()) {
      this.authenticate();
    }
  },
  methods: {
    authenticate() {
      this.$store.dispatch(AUTHENTICATE);
    },
    handleAuthClick() {
      if (this.isLoggedIn) {
        this.logout();
      } else {
        this.login();
      }
    },
    logout() {
      this.$store.dispatch(LOGOUT);
      this.$store.dispatch(LOGOUT_GOOGLE);
      this.$store.dispatch(LOGOUT_FACEBOOK);
      this.$store.commit(LOGIN_DIALOG, false);
      this.authText = "Sign In";
    },
    login() {
      this.$store.dispatch(AUTOMATIC_LOGIN);
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "dark"]),
    loginDialog: {
      get() {
        return this.$store.getters.loginDialog;
      },
      set(dialog) {
        this.$store.commit(LOGIN_DIALOG, dialog);
      }
    },
    usernameDialog: {
      get() {
        return this.$store.getters.usernameDialog;
      },
      set(dialog) {
        this.$store.commit(USERNAME_DIALOG, dialog);
      }
    },
    shareDialog: {
      get() {
        return this.$store.getters.shareDialog;
      },
      set(dialog) {
        this.$store.commit(SHARE_DIALOG, dialog);
      }
    }
  },
  watch: {
    $route() {
      this.$ga.set("userId", localStorage.getItem("userId"));
    },
    isLoggedIn: function() {
      if (this.isLoggedIn) {
        this.authText = "Sign Out";
      } else {
        this.authText = "Sign In";
      }
    },
    "$route.params.subreddit": function() {
      // Change color of AppBar based on subreddit color
      // this.searchText = "";
      // this.appbarColor = this.subreddits[subreddit].color;
    }
  },
  data: () => ({
    authText: "Sign In"
  }),
  components: {
    Login,
    Share,
    Notification,
    UpdateNotification,
    Username,
    Drawer,
    BottomNav,
    TopNav
  },
  metaInfo: {
    title: "Meme Exchange",
    titleTemplate: "%s | The Meme Economy Begins Here",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0" },
      {
        name: "keywords",
        content:
          "memes,memeexchange,memeeconomy,gifs,funny,pictures,pics,gif,fun,humor,videos,vids,dank,fail,best"
      },
      {
        vmid: "description",
        name: "description",
        content:
          "The Meme Exchange is the hottest way to browse and share memes. Invest your coins in trending memes and watch your profits grow!"
      },
      { name: "subject", content: "Browsing and investing in memes" },
      { name: "copyright", content: "Meme Exchange" },
      {
        vmid: "og:title",
        name: "og:title",
        content: "Meme Exchange | The Meme Economy Begins Here"
      },
      { name: "og:type", content: "website" },
      { name: "og:url", content: window.location.href },
      {
        name: "og:image",
        content: `${process.env.BASE_URL}logo.png`
      },
      {
        vmid: "og:description",
        name: "og:description",
        content:
          "The Meme Exchange is the hottest way to browse and share memes. Invest your coins in trending memes and watch your profits grow!"
      },
      {
        name: "og:site_name",
        content: "Meme Exchange"
      },
      {
        name: "google-signin-client_id",
        content:
          "569258220493-eml45aftpqegtpas801oq5k87pqgad8u.apps.googleusercontent.com"
      }
    ],
    link: [
      { rel: "icon", href: `${process.env.BASE_URL}favicon.ico` },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ],
    script: [
      {
        type: "application/ld+json",
        json: {
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: "Meme Exchange",
          url: "https://meme.exchange",
          description:
            "The Meme Exchange is the hottest way to browse and share memes. Invest your coins in trending memes and watch your profits grow!",
          applicationCategory: "Game",
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          softwareVersion: "1.0.0",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
          },
          softwareHelp: {
            "@type": "CreativeWork",
            url: "https://meme.exchange/help"
          },
          operatingSystem: "All"
        }
      },
      {
        src: "https://apis.google.com/js/platform.js",
        async: true,
        defer: true
      }
    ]
  }
};
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
* {
  overscroll-behavior: none;
}
</style>
