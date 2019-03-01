<style lang="scss" scoped>
.meme-card {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <v-card class="meme-card" @click="goToMeme">
    <v-img
      :src="meme.url"
      :lazy-src="meme.thumbnail"
      aspect-ratio="1"
      class="grey lighten-2"
      contain
    >
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-layout>
    </v-img>
    <v-card-title>
      <div>
        <span class="headline">{{ meme.title }}</span>
        <div class="grey--text font-weight-light">
          {{ meme.score.toLocaleString() }}
        </div>
      </div>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-card-actions>
      <v-dialog v-model="buy" width="700">
        <v-btn slot="activator" color="success" small>Buy</v-btn>
        <Buy :meme="meme" :onSuccess="bought" />
      </v-dialog>
      <!-- <v-dialog v-model="sell" width="600">
        <v-btn slot="activator" color="error" small>Sell</v-btn>
      </v-dialog> -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-dialog v-model="share" width="700">
        <v-btn icon slot="activator">
          <v-icon>share </v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="title font-weight-bold">Share</span>
            <v-spacer></v-spacer>
            <v-btn class="mx-0" icon @click="share = false">
              <v-icon>fa fa-times</v-icon>
            </v-btn>
          </v-card-title>
          <v-list>
            <v-list-tile @click="true">
              <v-list-tile-action>
                <v-icon color="indigo">fab fa-facebook</v-icon>
              </v-list-tile-action>
              <v-card-title>Facebook</v-card-title>
            </v-list-tile>
            <v-list-tile @click="true">
              <v-list-tile-action>
                <v-icon color="cyan">fab fa-twitter</v-icon>
              </v-list-tile-action>
              <v-card-title>Twitter</v-card-title>
            </v-list-tile>
            <v-list-tile @click="true">
              <v-list-tile-action>
                <v-icon>fa fa-envelope</v-icon>
              </v-list-tile-action>
              <v-card-title>Email</v-card-title>
            </v-list-tile>
          </v-list>
          <v-text-field
            ref="link"
            :label="meme.copied ? 'Link copied!' : 'Click to copy link'"
            color="success"
            append-icon="far fa-copy"
            @click:append="copy"
            class="pa-3"
            readonly
            :value="meme.url"
            @click="copy"
          ></v-text-field>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import Buy from "@/components/Meme.Buy";

export default {
  components: {
    Buy
  },
  props: {
    meme: Object
  },
  data: () => ({
    share: false,
    buy: false
    // sell: false
  }),
  methods: {
    bought() {
      this.buy = false
    },
    copy() {
      const markup = this.$refs.link;
      markup.focus();
      document.execCommand("selectAll", false, null);
      this.meme.copied = document.execCommand("copy");
    },
    goToMeme() {
      this.$router.push(`/r/${this.$route.params.subreddit}/${this.meme.id}`);
    }
  },
  watch: {
    share() {
      if (!this.share) this.meme.copied = false;
    }
  }
};
</script>
