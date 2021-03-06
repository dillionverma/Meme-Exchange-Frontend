<template>
  <v-layout>
    <v-flex>
      <v-toolbar id="toolbar" dark tabs extended prominent>
        <v-row>
          <v-col>
            <v-avatar class="grey lighten-4" size="100">
              <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
              <v-icon v-else>
                person
              </v-icon>
            </v-avatar>
          </v-col>
          <v-spacer v-show="$vuetify.breakpoint.lgAndUp" />
          <v-col>
            <v-toolbar-title>{{ user.username }}</v-toolbar-title>
            <h2 class="display-1">
              + {{ user.coins ? user.coins.toLocaleString() : null }}
            </h2>
          </v-col>
        </v-row>
        <!-- <v-avatar class="grey lighten-4" size="100">
          <img v-if="user.avatar" :src="user.avatar" alt="Avatar" />
          <v-icon v-else>
            person
          </v-icon>
        </v-avatar>
        <v-toolbar-title>{{ user.username }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <h2
          class="display-1"
          style="align-self: flex-end; padding-bottom: 6px; padding-top: 0;"
        >
          + {{ user.coins ? user.coins.toLocaleString() : null }}
        </h2> -->
        <!-- <v-btn icon>
          <v-icon>more_vert</v-icon>
        </!-->
        <template v-slot:extension>
          <v-tabs v-model="tabs" align-with-title show-arrows>
            <v-tabs-slider color="secondary"></v-tabs-slider>
            <v-tab v-for="item in items" :href="`#${item}`" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-card>
        <v-tabs-items touchless v-model="tabs">
          <v-tab-item key="profile" value="profile">
            <v-card id="portfolio-card" flat>
              <v-card-title>
                Portfolio
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
                :items="user.portfolio"
                :search="search"
                mobile-breakpoint="0"
              >
                <template slot="item" slot-scope="props">
                  <router-link
                    :to="`/r/${props.item.subreddit}/${props.item.reddit_id}`"
                    tag="tr"
                  >
                    <td>{{ props.item.title }}</td>
                    <td class="text-xs-right">
                      {{ props.item.subreddit }}
                    </td>
                    <td class="text-xs-right">{{ props.item.author }}</td>
                    <td class="text-xs-right">
                      {{ props.item.quantity.toLocaleString() }}
                    </td>
                    <td :class="`${pColor(props.item.profit)}--text`">
                      <v-icon small :color="pColor(props.item.profit)">
                        {{
                          props.item.profit >= 0
                            ? "arrow_drop_up"
                            : "arrow_drop_down"
                        }}
                      </v-icon>
                      {{ props.item.profit.toLocaleString() }}
                    </td>
                    <td
                      v-if="isCurrentUser"
                      class="justify-center align-center"
                    >
                      <v-dialog v-model="props.item.sell" width="700">
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" color="success" small>Sell</v-btn>
                        </template>
                        <Sell :meme="props.item" :onSuccess="sold" />
                      </v-dialog>
                    </td>
                  </router-link>
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
          </v-tab-item>

          <v-tab-item key="transactions" value="transactions">
            <v-card id="transactions-card" flat>
              <v-card-title>
                Transactions
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
                :headers="transactionHeaders"
                :items="transactions"
                :search="search"
                mobile-breakpoint="0"
              >
                <template slot="item" slot-scope="props">
                  <router-link
                    :to="
                      `/r/${props.item.meme.subreddit}/${props.item.meme.reddit_id}`
                    "
                    tag="tr"
                  >
                    <td>
                      {{ formatDate(props.item.created_at) }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.transaction_type }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.meme.title }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.price.toLocaleString() }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.quantity.toLocaleString() }}
                    </td>
                    <td class="text-xs-right">
                      {{
                        (
                          props.item.quantity * props.item.price
                        ).toLocaleString()
                      }}
                    </td>
                  </router-link>
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
          </v-tab-item>

          <v-tab-item key="porfolio history" value="portfolio history">
            <v-card id="portfolio-history-card" flat>
              <v-card-title>
                Portfolio History
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
                :headers="historyHeaders"
                :items="user.portfolio_history"
                :search="search"
                mobile-breakpoint="0"
              >
                <template slot="item" slot-scope="props">
                  <router-link
                    :to="`/r/${props.item.subreddit}/${props.item.reddit_id}`"
                    tag="tr"
                  >
                    <td>{{ props.item.title }}</td>
                    <td class="text-xs-right">
                      {{ props.item.subreddit }}
                    </td>
                    <td class="text-xs-right">{{ props.item.author }}</td>
                    <!-- <td class="text-xs-right">{{ props.item.quantity }}</td> -->
                    <!-- <td class="justify-center layout px-0">
                            <v-dialog v-model="props.item.sell" width="700">
                              <v-btn slot="activator" color="success" small
                                >Sell</v-btn
                              >
                              <Sell :meme="props.item" />
                            </v-dialog>
                          </td> -->
                  </router-link>
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
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { formatDate } from "@/lib/helpers.js";
import { GET_USER, GET_TRANSACTIONS } from "@/store/user.module";
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
    this.$store.dispatch(GET_TRANSACTIONS, {
      username: this.$route.params.username
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    transactions() {
      return this.$store.getters.transactions;
    },
    isCurrentUser() {
      return this.user.username == this.$store.getters.currentUser.username;
    },
    headers() {
      let headers = [
        {
          text: "Title",
          align: "start",
          // sortable: false,
          value: "title"
          // width: "10"
        },
        {
          text: "Subreddit",
          value: "subreddit",
          align: "start"
        },
        {
          text: "Author",
          align: "start",
          value: "author"
        },
        {
          text: "Quantity",
          align: "start",
          value: "quantity"
        },
        {
          text: "Total Profit",
          align: "start",
          value: "profit"
        }
      ];
      // Don't show actions unless it is current user
      if (this.isCurrentUser) {
        headers.push({
          text: "Actions",
          align: "center",
          value: ""
        });
      }
      return headers;
    }
  },
  watch: {
    "$route.params.username": function() {
      this.$store.dispatch(GET_USER, { username: this.$route.params.username });
      this.$store.dispatch(GET_TRANSACTIONS, {
        username: this.$route.params.username
      });
    }
  },
  methods: {
    pColor(value) {
      if (value >= 0) {
        return "green";
      } else {
        return "red";
      }
    },
    sold() {
      this.sell = false;
    },
    formatDate(date) {
      return formatDate(date);
    }
  },
  data() {
    return {
      search: "",
      sell: false,
      // items: ["profile", "transactions", "portfolio history"],
      items: ["profile"],
      tabs: "profile",
      transactionHeaders: [
        {
          text: "Date",
          align: "left",
          // sortable: false,
          value: "created_at",
          width: 150
        },
        {
          text: "Transaction Type",
          value: "transaction_type",
          align: "left"
        },
        {
          text: "Title",
          align: "left",
          value: "meme.title"
        },
        {
          text: "Price",
          align: "left",
          value: "price"
        },
        {
          text: "Quantity",
          align: "left",
          value: "quantity"
        },
        {
          text: "Total Price",
          align: "left"
        }
      ],
      historyHeaders: [
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
          align: "left"
        },
        {
          text: "Author",
          align: "left",
          value: "author"
        }
        // {
        //   text: "Quantity",
        //   align: "right",
        //   value: "quantity"
        // },
        // {
        //   text: "Actions",
        //   align: "center"
        // }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#toolbar {
  background-image: url("https://picsum.photos/600/300?random");
  background-size: cover;
  background-blend-mode: soft-light;
}
.v-toolbar__title {
  margin-left: 10px;
}
</style>
