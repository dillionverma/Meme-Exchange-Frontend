<template>
  <v-bottom-navigation
    :value="bottomNav"
    :input-value="!$vuetify.breakpoint.lgAndUp"
    color="primary"
    show
    fixed
    grow
  >
    <v-btn value="explore" to="/" @click="vibrate">
      <span>Explore</span>
      <v-icon>search</v-icon>
    </v-btn>

    <!-- <v-btn value="dashboard" to="/dashboard" @click="vibrate">
      <span>Dashboard</span>
      <v-icon>dashboard</v-icon>
    </v-btn> -->

    <v-btn value="leaderboard" to="/leaderboard" @click="vibrate">
      <span>Leaderboard</span>
      <v-icon>list</v-icon>
    </v-btn>

    <v-btn
      value="profile"
      v-if="isLoggedIn"
      :to="`/user/${user.username}`"
      @click="vibrate"
    >
      <span>Profile</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
