<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
  >
    <v-layout column>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Explore
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/dashboard">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Dashboard
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn" :to="`/user/${user.username}`">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Profile
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
</template>

<script>
import { mapGetters } from "vuex";
import { DRAWER } from "@/store/app.module";

export default {
  mounted() {
    this.fetchThumbnails();
  },
  props: {
    authText: String,
    handleAuthClick: Function
  },

  methods: {
    async fetchThumbnails() {
      try {
        const res = await this.reddit.get(`/api/info.json`, {
          id: Object.values(this.subreddits)
            .map(s => s.id)
            .join()
        });

        for (let subreddit of res.data.children) {
          this.subreddits[subreddit.data.display_name].icon =
            subreddit.data.icon_img;
          this.subreddits[subreddit.data.display_name].color =
            subreddit.data.key_color;
        }
      } catch (e) {
        console.log(Object.getOwnPropertyNames(e));
        console.log(e);
        console.log(e.message);
      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "extraItems", "subreddits", "footer"]),
    user() {
      return this.$store.getters.currentUser;
    },
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(drawer) {
        this.$store.commit(DRAWER, drawer);
      }
    }
  }
};
</script>

<style lang="scss">
#footer {
  // background: white;
  div div a {
    text-decoration: none;
    // color: rgba(0, 0, 0, 0.87);
  }
}
</style>
