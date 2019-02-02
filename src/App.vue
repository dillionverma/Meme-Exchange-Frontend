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
  background: white;
  div div a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>

<template>
  <v-app id="inspire">
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
          <v-list-tile v-for="(item, i) in subreddits" :key="i" :to="item.path">
            <v-list-tile-action>
              <v-avatar color="grey lighten-4" size="36px">
                <img :src="item.icon" :alt="item.text + ' icon'" />
              </v-avatar>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-subheader class="">MORE</v-subheader>
        <v-list>
          <v-list-tile v-for="(item, i) in menu" :key="i" :to="item.path">
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
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title id="title">
        <span class="hidden-sm-and-down">{{ this.title }}</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-title>Coins: {{ user.coins }}</v-toolbar-title>
      <!-- <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn> -->
      <v-menu bottom left v-if="isLoggedIn">
        <!-- <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn> -->
        <v-btn slot="activator" icon>
          <v-avatar size="32px">
            <img :src="user.avatar" :alt="user.username" />
          </v-avatar>
        </v-btn>

        <v-list>
          <v-list-tile v-for="(item, i) in menu" :key="i" :to="item.path">
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
      </v-menu>
      <v-btn v-else flat @click="handleAuthClick">
        {{ authText }}
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view />
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
import Login from "@/components/Login";

import { AUTHENTICATE, LOGOUT } from "@/store/auth.module";

export default {
  mounted() {
    if (!this.isLoggedIn) {
      this.authenticate();
    }
    this.subreddits.map((subreddit, i) =>
      this.fetchThumbnail(subreddit.text, i)
    );
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
      this.dialog = false;
      this.drawer = false;
      this.authText = "Sign In";
    },
    login() {
      this.dialog = true;
      this.drawer = false;
    },
    fetchThumbnail(subreddit, i) {
      this.axios
        .get(`/reddit/r/${subreddit}/about.json`)
        .then(res => {
          this.subreddits[i].icon = res.data.data.icon_img;
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.currentUser;
    }
  },
  watch: {
    isLoggedIn: function() {
      if (this.isLoggedIn) {
        this.dialog = false; // once isLoggedIn, close login dialog
        this.authText = "Sign Out";
      } else {
        this.authText = "Sign In";
      }
    }
  },
  data: () => ({
    title: "Meme Exchange",
    authText: "Sign In",
    dialog: false,
    drawer: null,
    items: [
      { icon: "home", text: "Home", path: "/" },
      { icon: "search", text: "Explore", path: "/r/memes" },
      { icon: "list", text: "Leaderboard", path: "/leaderboard" },
      { icon: "exit_to_app", text: "Login", path: "/login" },
      { icon: "person_add", text: "Sign Up", path: "/signup" }
    ],
    menu: [
      { icon: "settings", text: "Settings", path: "/settings" },
      { icon: "chat_bubble", text: "Send feedback", path: "/feedback" },
      { icon: "help", text: "Help", path: "/help" }
    ],
    subreddits: [
      { text: "memes", path: "/r/memes", icon: "" },
      { text: "dankmemes", path: "/r/dankmemes", icon: "" },
      { text: "memeeconomy", path: "/r/memeeconomy", icon: "" },
      { text: "blackpeopletwitter", path: "/r/blackpeopletwitter", icon: "" },
      {
        text: "wholesomememes",
        path: "/r/wholesomememes",
        icon: ""
      },
      {
        text: "Me_irl",
        path: "/r/Me_irl",
        icon: ""
      },
      {
        text: "surrealmemes",
        path: "/r/surrealmemes",
        icon: ""
      },
      {
        text: "deepfriedmemes",
        path: "/r/deepfriedmemes",
        icon: ""
      },
      {
        text: "imgoingtohellforthis",
        path: "/r/imgoingtohellforthis",
        icon: ""
      }
    ],
    footer: [
      { text: "About", path: "/about" },
      { text: "Press", path: "/press" },
      { text: "Copyright", path: "/copyright" },
      { text: "Contact Us", path: "/contact-us" },
      { text: "Terms", path: "/terms" },
      { text: "Privacy Policy", path: "/privacy-policy" }
    ]
  }),
  components: {
    Login
  }
};
</script>
