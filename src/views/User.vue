<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <v-card class="v-card-profile">
          <v-avatar class="mx-auto d-block grey lighten-4" size="100">
            <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
            <v-icon v-else>
              person
            </v-icon>
          </v-avatar>
          <v-card-text class="text-xs-center">
            <!-- <h6 class="category text-gray font-weight-thin mb-3">
              CEO / CO-FOUNDER
            </h6> -->
            <h4 class="card-title font-weight-light">{{ user.username }}</h4>
            <p class="card-description font-weight-light">
              <!-- {{ user }} -->
            </p>
          </v-card-text>
        </v-card>

        <v-card id="portfolio-card">
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
          <v-data-table :headers="headers" :items="user.memes" :search="search">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.subreddit }}</td>
              <td class="text-xs-right">{{ props.item.author }}</td>
              <td class="text-xs-right">{{ props.item.quantity }}</td>
              <td class="justify-center layout px-0">
                <v-dialog v-model="props.item.sell" width="700">
                  <v-btn slot="activator" color="success" small>Sell</v-btn>
                  <Sell :meme="props.item" />
                </v-dialog>
              </td>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_USER } from "@/store/user.module";
import Sell from "@/components/Meme.Sell";

export default {
  components: {
    Sell
  },
  props: {
    meme: Object
  },
  mounted() {
    this.$store.dispatch(GET_USER, { username: this.$route.params.username });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      search: "",
      sell: {},
      headers: [
        {
          text: "Title",
          align: "left",
          // sortable: false,
          value: "title"
          // width: "10"
        },
        {
          text: "Subreddit",
          value: "subreddit",
          align: "right"
        },
        {
          text: "Author",
          align: "right",
          value: "author"
        },
        {
          text: "Quantity",
          align: "right",
          value: "quantity"
        },
        {
          text: "Actions",
          align: "center"
        }
      ]
    };
  }
};
</script>
