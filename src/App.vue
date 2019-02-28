<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <!-- <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="this.user.avatar" />
            </v-list-tile-avatar>
            <span>coins: {{ this.user.coins }}</span>
            <v-list-tile-content>
              <v-list-tile-title>{{ this.user.username }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar> -->
      <v-layout column>
        <v-list>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
           <v-list-tile v-if="isLoggedIn" :to="`/user/${currentUser.username}`">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Profile
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/r/memes">
            <v-list-tile-action>
              <v-icon>search</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Explore
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/leaderboard">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Leaderboard
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-subheader class="">SUBREDDITS</v-subheader>
          <v-list-tile
            v-for="(item, subreddit, i) in subreddits"
            :key="i"
            :to="item.path"
          >
            <v-list-tile-action>
              <v-avatar color="grey lighten-4" size="36px">
                <img :src="item.icon" />
              </v-avatar>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-subheader class="">MORE</v-subheader>
        <v-list>
          <v-list-tile v-for="(item, i) in extraItems" :key="i" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>

        <v-spacer></v-spacer>
        <v-list>
          <v-list-tile @click="handleAuthClick">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ authText }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-footer id="footer" height="auto">
          <v-layout justify-center row wrap>
            <v-list-tile-content>
              <v-container text-xs-center py-3>
                <v-layout align-center justify-space-between row wrap>
                  <v-flex>
                    <router-link class="caption" to="/about">
                      About
                    </router-link>
                  </v-flex>
                  <v-flex>
                    <router-link class="caption" to="/press">
                      Press
                    </router-link>
                  </v-flex>
                  <v-flex>
                    <router-link class="caption" to="/copyright">
                      Copyright
                    </router-link>
                  </v-flex>
                  <v-flex>
                    <router-link class="caption" to="/contact-us">
                      Contact Us
                    </router-link>
                  </v-flex>
                  <v-flex>
                    <router-link class="caption" to="/terms">
                      Terms
                    </router-link>
                  </v-flex>
                  <v-flex>
                    <router-link class="caption" to="/privacy-policy">
                      Privacy Policy
                    </router-link>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile-content>
            <v-layout justify-center row wrap>
              <v-flex xs12 text-xs-center py-3>
                <router-link to="/about">
                  &copy;2019 — <strong>Memesx</strong>
                </router-link>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-footer>
        <!-- <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template> -->
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="appbarColor"
      :dark="!dark"
      app
      fixed
      :scroll-off-screen="!$vuetify.breakpoint.lgAndUp"
    >
      <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title id="title">
        <span class="hidden-sm-and-down">{{ this.title }}</span>
      </v-toolbar-title>
      <v-text-field
        v-model="searchText"
        @keyup.enter="search"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search for subreddits"
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title>Coins: {{ user.coins }}</v-toolbar-title> -->
      <!-- <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn> -->
      <v-menu
        v-model="menu"
        bottom
        left
        v-if="isLoggedIn"
        :close-on-content-click="false"
      >
        <!-- <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn> -->
        <v-btn slot="activator" flat>
          <v-avatar color="grey lighten-4" left size="32px">
            <img
              v-if="currentUser.avatar"
              :src="currentUser.avatar"
              alt="avatar"
            />
            <v-icon v-else>
              person
            </v-icon>
          </v-avatar>
          <span class="body-2 ml-2">{{ currentUser.username }}</span>
        </v-btn>

        <v-card>
          <v-list>
            <v-list-tile avatar :to="profile" @click="closeMenu">
              <v-list-tile-avatar>
                <img
                  v-if="currentUser.avatar"
                  :src="currentUser.avatar"
                  alt="avatar"
                />
                <v-icon v-else>
                  person
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{
                  currentUser.username
                }}</v-list-tile-title>
                <v-list-tile-sub-title
                  >+ {{ currentUser.coins }}</v-list-tile-sub-title
                >
              </v-list-tile-content>

              <!-- <v-list-tile-action>
                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                  <v-icon>favorite</v-icon>
                </v-btn>
              </v-list-tile-action> -->
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-tile
              v-for="(item, i) in extraItems"
              :key="i"
              :to="item.path"
              @click="closeMenu"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="handleAuthClick">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ authText }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn v-else flat @click="handleAuthClick">
        {{ authText }}
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view />
          <Notification />
        </v-layout>
      </v-container>
    </v-content>
    <!-- <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn> -->
    <v-dialog v-model="dialog" width="400px">
      <Login />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import JwtService from "@/lib/jwt.service";
import Login from "@/components/Login";
import Notification from "@/components/Notification";

import { AUTHENTICATE, LOGOUT } from "@/store/auth.module";
import { DIALOG, MENU, DRAWER } from "@/store/app.module";

export default {
  mounted() {
    if (!this.isLoggedIn && JwtService.getToken()) {
      this.authenticate();
    }
    for (var subreddit in this.subreddits) this.fetchThumbnail(subreddit);
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
      this.$store.commit(DIALOG, false);
      this.authText = "Sign In";
    },
    login() {
      this.$store.commit(DIALOG, true);
      this.$store.commit(MENU, false);
    },
    closeMenu() {
      this.$store.commit(MENU, false);
    },
    toggleDrawer() {
      this.$store.commit(DRAWER);
    },
    fetchThumbnail(subreddit) {
      this.axios
        .get(`/reddit/r/${subreddit}/about.json`)
        .then(res => {
          this.subreddits[subreddit].icon = res.data.data.icon_img;
          this.subreddits[subreddit].color = res.data.data.key_color;
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    search() {
      console.log(this.searchText)
      if (this.searchText) {
        console.log(this.searchText)
        this.$router.push("/r/" + this.searchText)
      }
    }
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "currentUser",
      "title",
      "appbarColor",
      "items",
      "extraItems",
      "subreddits",
      "footer",
      "dark"
    ]),
    menu: {
      get() {
        return this.$store.getters.menu;
      },
      set(menu) {
        this.$store.commit(MENU, menu);
      }
    },
    dialog: {
      get() {
        return this.$store.getters.dialog;
      },
      set(dialog) {
        this.$store.commit(DIALOG, dialog);
      }
    },
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(drawer) {
        this.$store.commit(DRAWER, drawer);
      }
    },
    profile() {
      return "/user/" + this.currentUser.username;
    }
  },
  watch: {
    isLoggedIn: function() {
      if (this.isLoggedIn) {
        this.$store.commit(DIALOG, false);
        this.authText = "Sign Out";
      } else {
        this.authText = "Sign In";
      }
    },
    "$route.params.subreddit": function(subreddit) {
      // Change color of AppBar based on subreddit color
      this.searchText = ""
      // this.appbarColor = this.subreddits[subreddit].color;
    }
  },
  data: () => ({
    authText: "Sign In",
    searchText: null,
  }),
  components: {
    Login,
    Notification
  }
};
</script>

<style lang="scss">
#title {
  @media (max-width: 960px) {
    width: 0 !important;
  }
  width: 300px;
}
.v-text-field.v-text-field--solo .v-input__control {
  @media (max-width: 960px) {
    min-height: auto;
  }
}

#footer {
  // background: white;
  div div a {
    text-decoration: none;
    // color: rgba(0, 0, 0, 0.87);
  }
}
</style>
