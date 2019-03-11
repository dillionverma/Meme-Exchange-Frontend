<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :color="appbarColor || 'primary'"
    :dark="!dark"
    app
    fixed
    :scroll-off-screen="!$vuetify.breakpoint.lgAndUp"
  >
    <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title id="title">
      <span class="hidden-sm-and-down"
        >{{ title }}<small color="grey lighten-2" id="beta">BETA</small></span
      >
    </v-toolbar-title>
    <v-text-field
      v-model="searchText"
      @keyup.enter="search"
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      :loading="memeLoading"
      label="Search for subreddits"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
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
            <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
            <v-icon v-else>
              person
            </v-icon>
          </v-avatar>
          <span class="body-2 ml-2">{{ user.username }}</span>
        </v-btn>

        <v-card>
          <v-list>
            <v-list-tile
              avatar
              :to="`/user/${user.username}`"
              @click="closeMenu"
            >
              <v-list-tile-avatar>
                <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
                <v-icon v-else>
                  person
                </v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ user.username }}</v-list-tile-title>
                <v-list-tile-sub-title
                  >+ {{ user.coins.toLocaleString() }}</v-list-tile-sub-title
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
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import { MENU, DRAWER } from "@/store/app.module";

export default {
  props: {
    authText: String,
    handleAuthClick: Function
  },
  methods: {
    toggleDrawer() {
      this.$store.commit(DRAWER);
    },

    closeMenu() {
      this.$store.commit(MENU, false);
    },

    search() {
      console.log(this.searchText);
      if (this.searchText) {
        console.log(this.searchText);
        this.$router.push("/r/" + this.searchText);
      }
    }
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "currentUser",
      "title",
      "appbarColor",
      "extraItems",
      "dark",
      "memeLoading"
    ]),
    user() {
      return this.$store.getters.currentUser;
    },
    menu: {
      get() {
        return this.$store.getters.menu;
      },
      set(menu) {
        this.$store.commit(MENU, menu);
      }
    }
  },
  data: () => ({
    searchText: null
  })
};
</script>

<style lang="scss">
#title {
  @media (max-width: 960px) {
    width: 0 !important;
  }
  width: 400px;
  overflow: visible !important;
  margin-bottom: 9px;
  #beta {
    position: relative;
    top: 15px;
    right: 25px;
    font-size: 50%;
  }
}

.v-text-field.v-text-field--solo .v-input__control {
  @media (max-width: 960px) {
    min-height: auto;
  }
}
</style>
