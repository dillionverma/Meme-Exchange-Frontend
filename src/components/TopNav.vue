<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :color="appbarColor"
    :dark="!dark"
    app
    fixed
    :scroll-off-screen="!$vuetify.breakpoint.lgAndUp"
  >
    <v-app-bar-nav-icon
      v-show="!$vuetify.breakpoint.lgAndUp"
      @click="
        toggleDrawer();
        vibrate();
      "
    ></v-app-bar-nav-icon>
    <v-btn to="/" icon @click="vibrate" v-if="!$vuetify.breakpoint.lgAndUp">
      <v-avatar size="40px">
        <img src="/logo.png" alt="logo" />
      </v-avatar>
    </v-btn>
    <v-toolbar-title id="title" class="font-weight-medium">
      <span v-if="$vuetify.breakpoint.lgAndUp"
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
      style="margin-left: 5px"
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
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :text="$vuetify.breakpoint.smAndUp"
            :icon="!$vuetify.breakpoint.smAndUp"
          >
            <v-avatar color="grey lighten-4" left size="32px">
              <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
              <v-icon v-else>
                person
              </v-icon>
            </v-avatar>
            <span v-if="$vuetify.breakpoint.smAndUp" class="body-2 ml-2">{{
              user.username
            }}</span>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item :to="`/user/${user.username}`" @click="closeMenu">
              <v-list-item-avatar>
                <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
                <v-icon v-else>
                  person
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.username }}</v-list-item-title>
                <v-list-item-subtitle
                  >+ {{ user.coins.toLocaleString() }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <!-- <v-list-item-action>
                  <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                </v-list-item-action> -->
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              v-for="(item, i) in extraItems"
              :key="i"
              :to="item.path"
              @click="closeMenu"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
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
        </v-card>
      </v-menu>
      <v-btn
        v-else
        text
        @click="
          handleAuthClick();
          vibrate();
        "
      >
        {{ authText }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
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
  @media (max-width: 1264px) {
    width: 0 !important;
  }
  width: 400px;
  overflow: visible !important;
  margin-bottom: 10px;
  font-size: 1.4rem;
  #beta {
    position: relative;
    top: 20px;
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
