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
  </v-app>
</template>

<script>
/* global gapi */
import { mapGetters } from "vuex";
import JwtService from "@/lib/jwt.service";
import Login from "@/components/Login";
import Username from "@/components/Username";
import Drawer from "@/components/Drawer";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import Notification from "@/components/Notification";
import UpdateNotification from "@/components/UpdateNotification";
import { AUTHENTICATE, LOGOUT } from "@/store/auth.module";
import { LOGIN_DIALOG, MENU, USERNAME_DIALOG } from "@/store/app.module";

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
      this.$store.commit(LOGIN_DIALOG, false);
      this.authText = "Sign In";
      this.signOutGoogle();
    },
    signOutGoogle() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("Google user signed out.");
      });
    },
    login() {
      this.$store.commit(LOGIN_DIALOG, true);
      this.$store.commit(MENU, false);
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
    }
  },
  watch: {
    $route() {
      this.$ga.set("userId", localStorage.getItem("userId"));
    },
    isLoggedIn: function() {
      if (this.isLoggedIn) {
        this.$store.commit(LOGIN_DIALOG, false);
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
    Notification,
    UpdateNotification,
    Username,
    Drawer,
    BottomNav,
    TopNav
  }
};
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
* {
  overscroll-behavior: none;
}
</style>
