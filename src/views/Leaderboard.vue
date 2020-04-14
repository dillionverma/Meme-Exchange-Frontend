<template>
  <v-layout justify-center fill-height>
    <v-flex xs12>
      <v-card id="leaderboard-card">
        <v-card-title>
          Leaderboard
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
          :search="search"
          :items="leaderboard"
          :footer-props="footerProps"
          :items-per-page="20"
          mobile-breakpoint="0"
        >
          <template slot="item" slot-scope="props">
            <router-link :to="`/user/${props.item.username}`" tag="tr">
              <td>{{ props.item.rank.toLocaleString() }}</td>
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
              <td class="text-xs-right">
                {{ props.item.coins.toLocaleString() }}
              </td>
            </router-link>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { LEADERBOARD } from "@/store/leaderboard.module";

export default {
  name: "Leaderboard",
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
      footerProps: {
        "items-per-page-options": [10, 20, 30, 40, -1]
      },
      headers: [
        {
          text: "Rank",
          align: "start",
          // sortable: false,
          value: "rank",
          width: 80
        },
        {
          text: "Username",
          // sortable: false,
          value: "username"
        },
        {
          text: "Coins",
          align: "start",
          value: "coins"
        }
      ]
    };
  },
  metaInfo: {
    title: "Leaderboard",
    titleTemplate: "%s | Meme Exchange",
    meta: [
      {
        vmid: "og:title",
        name: "og:title",
        content: "Leaderboard | Meme Exchange"
      },
      {
        vmid: "description",
        name: "description",
        content: "See how you rank up against the top meme investors"
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "See how you rank up against the top meme investors"
      }
    ]
  }
};
</script>

<style lang="scss">
// #leaderboard-card {
//   width: 80%;
//   height: 100%;
// }
</style>
