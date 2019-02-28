<template>
  <v-card id="leaderboard-card">
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="leaderboard"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
    >
      <template slot="items" slot-scope="props">
        <router-link :to="userRoute(props.item.username)" tag="tr">
          <td>{{ props.item.rank }}</td>
          <td>
            <v-avatar size="32px" color="grey lighten-4">
              <img
                v-if="props.item.avatar"
                :src="props.item.avatar"
                alt="Avatar"
              />
              <v-icon v-else>
                person
              </v-icon>
            </v-avatar>

            {{ props.item.username }}
          </td>
          <td class="text-xs-right">{{ props.item.coins }}</td>
        </router-link>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import { LEADERBOARD } from "@/store/leaderboard.module";

export default {
  mounted() {
    this.$store.dispatch(LEADERBOARD);
  },
  computed: {
    leaderboard() {
      return this.$store.getters.leaderboard;
    }
  },
  data() {
    return {
      search: "",
      rowsPerPageItems: [
        25,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      headers: [
        {
          text: "Rank",
          align: "left",
          // sortable: false,
          value: "rank",
          width: "10"
        },
        {
          text: "Username",
          // sortable: false,
          value: "username"
        },
        {
          text: "Coins",
          align: "right",
          value: "coins"
        }
      ]
    };
  },
  methods: {
    userRoute(username) {
      return "/user/" + username;
    }
  }
};
</script>

<style lang="scss">
#leaderboard-card {
  width: 80%;
  height: 100%;
}
</style>
