<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
  >
    <v-divider></v-divider>
    <v-list flat>
      <v-list-item to="/" @click="vibrate">
        <v-list-item-action>
          <v-icon>search</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Explore
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item to="/dashboard" @click="vibrate">
          <v-list-item-action>
            <v-icon>dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

      <v-list-item to="/leaderboard" @click="vibrate">
        <v-list-item-action>
          <v-icon>list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Leaderboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="isLoggedIn"
        :to="`/user/${user.username}`"
        @click="vibrate"
      >
        <v-list-item-action>
          <v-icon>person</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Profile
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-subheader class="">CATEGORIES</v-subheader>
    <v-list flat>
      <v-list-item
        v-for="(item, subreddit, i) in subreddits"
        :key="i"
        :to="item.path"
        @click="vibrate"
      >
        <v-list-item-action>
          <v-avatar color="grey lighten-4" size="36px">
            <img :src="item.icon" />
          </v-avatar>
        </v-list-item-action>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-subheader>MORE</v-subheader>
    <v-list flat>
      <v-list-item
        v-for="(item, i) in extraItems"
        :key="i"
        :to="item.path"
        @click="vibrate"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <v-spacer></v-spacer>
    <v-list>
      <v-list-item
        @click="
          handleAuthClick();
          vibrate();
        "
      >
        <v-list-item-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ authText }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <!-- <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          small
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Meme Exchange</strong>
        </v-col>
      </v-row>
    </v-footer> -->
    <v-footer id="footer" height="auto" padless>
      <v-container text-xs-center py-5>
        <v-layout d-flex justify-space-around flex-wrap>
          <router-link class="caption" to="/about">
            About
          </router-link>
          <router-link class="caption" to="/press">
            Press
          </router-link>
          <router-link class="caption" to="/copyright">
            Copyright
          </router-link>
          <router-link class="caption" to="/contact-us">
            Contact Us
          </router-link>
          <router-link class="caption" to="/terms">
            Terms
          </router-link>
          <router-link class="caption" to="/privacy-policy">
            Privacy Policy
          </router-link>
        </v-layout>
      </v-container>
      <v-col class="primary lighten-2 py-4 text-center white--text">
        &copy; {{ new Date().getFullYear() }} — <strong>Meme Exchange</strong>
      </v-col>
    </v-footer>
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

  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  }),

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
