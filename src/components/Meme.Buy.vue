<template>
  <v-card>
    <v-container>
      <v-layout wrap justify-center fill-height>
        <v-flex xs12 v-if="(meme.score - user.coins) * quantity > user.coins">
          <v-alert :value="true" type="warning" icon="priority_high">
            Insufficient funds. You require
            {{ (meme.score - user.coins) * quantity }} more coins
          </v-alert>
        </v-flex>
        <v-flex xs10 sm6>
          <v-img
            :src="meme.url"
            :lazy-src="meme.thumbnail"
            aspect-ratio="1"
            class="grey lighten-2"
            contain
          >
          </v-img>
        </v-flex>
        <v-flex xs12 sm6>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <div style="padding-bottom: 24px">
                  <div class="headline">{{ meme.title }}</div>
                  <div>{{ meme.author }}</div>
                  <div>
                    {{ date }}
                  </div>
                </div>
              </v-flex>
              <v-flex xs10 class="pr-3">
                <v-slider
                  v-model="quantity"
                  :max="max"
                  :min="min"
                  :rules="rules"
                  thumb-label="always"
                  hint="Slide to set quantity"
                  persistent-hint
                  @input="vibrate"
                  @start="vibrate"
                ></v-slider>
              </v-flex>

              <v-flex xs2 shrink style="width: 60px">
                <v-text-field
                  v-model="quantity"
                  class="mt-0"
                  hide-details
                  single-line
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-list two-line class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>Subtotal</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-subtitle>{{
            subtotal.toLocaleString()
          }}</v-list-item-subtitle>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Total</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-title>{{ total.toLocaleString() }}</v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions class="pa-3">
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="success"
        block
        @click="buy"
      >
        Buy
      </v-btn>
    </v-card-actions>
  </v-card>
  <!-- <v-card>
    <v-card-title class="headline" primary-title>
      {{ meme.title }}
    </v-card-title>
    <v-container>
      <v-layout row>
        <v-flex class="pr-3">
          <v-slider
            v-model="slider"
            :max="max"
            :min="min"
            thumb-label="always"
          ></v-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="slider"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title primary-title>
        <div>
        <h3 class="headline mb-0">$ {{ this.quantity }}</h3>
        </div>
    </v-card-title>
    <v-card-text> 

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="dialog = false">
        I accept
      </v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script>
import { formatDateMilli } from "@/lib/helpers.js";
import { BUY_MEME } from "@/store/meme.module";
import { LOGIN_DIALOG } from "@/store/app.module";
export default {
  data: () => ({
    min: 0,
    quantity: 1
  }),
  computed: {
    loading() {
      return this.$store.getters.memeLoading;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.currentUser;
    },
    subtotal() {
      return this.meme.score * this.quantity;
    },
    total() {
      return this.subtotal;
    },
    max() {
      return Math.floor(this.user.coins / this.meme.score) || 1;
    },
    rules() {
      return [v => v <= this.max || "You do not have enough for this purchase"];
    },
    date() {
      return formatDateMilli(this.meme.created);
    }
  },
  methods: {
    buy() {
      if (this.isLoggedIn) {
        this.$store.dispatch(BUY_MEME, {
          id: this.meme.id,
          quantity: this.quantity,
          username: this.user.username,
          onSuccess: this.onSuccess
        });
      } else {
        this.$store.commit(LOGIN_DIALOG, true);
      }
    }
  },
  props: {
    meme: Object,
    onSuccess: Function
  }
};
</script>

<style lang="scss">
.v-list--two-line .v-list__tile {
  height: 45px;
}
</style>
