<template>
  <v-bottom-nav
    :active.sync="bottomNav"
    :value="!$vuetify.breakpoint.lgAndUp"
    fixed
  >
    <v-btn color="primary" flat value="explore" to="/">
      <span>Explore</span>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="dashboard" to="/dashboard">
      <span>Dashboard</span>
      <v-icon>dashboard</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="leaderboard" to="/leaderboard">
      <span>Leaderboard</span>
      <v-icon>list</v-icon>
    </v-btn>

    <v-btn
      color="primary"
      flat
      value="profile"
      v-if="isLoggedIn"
      :to="`/user/${user.username}`"
    >
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    user() {
      return this.$store.getters.currentUser;
    }
  },
  data: () => ({
    bottomNav: "explore"
  })
};
</script>
