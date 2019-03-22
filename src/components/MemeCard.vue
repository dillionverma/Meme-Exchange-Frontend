<style lang="scss" scoped>
.meme-card {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <v-card class="meme-card">
    <v-img
      :src="meme.url"
      :lazy-src="meme.thumbnail"
      aspect-ratio="1"
      contain
      @click="goToMeme"
    >
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-layout>
    </v-img>
    <v-spacer></v-spacer>
    <v-card-title @click="goToMeme">
      <div>
        <span class="headline">{{ meme.title }}</span>
        <div class="grey--text font-weight-light">
          {{ meme.score.toLocaleString() }}
        </div>
      </div>
    </v-card-title>
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
      <v-btn icon :href="`https://reddit.com${meme.permalink}`" target="blank">
        <v-icon>fab fa-reddit</v-icon>
      </v-btn>
      <!-- <v-btn icon @click="() => {}">
        <v-icon>favorite</v-icon>
      </v-btn> -->
      <v-dialog v-model="share" width="700">
        <v-btn icon slot="activator">
          <v-icon>share</v-icon>
        </v-btn>
        <Share :meme="meme" :onClose="onClose" />
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import Buy from "@/components/Meme.Buy";
import Share from "@/components/Meme.Share";

export default {
  components: {
    Buy,
    Share
  },
  props: {
    meme: Object
  },
  data: () => ({
    share: false,
    buy: false
  }),
  methods: {
    bought() {
      this.buy = false;
    },
    onClose() {
      this.share = false;
    },
    goToMeme() {
      this.$router.push(
        `/r/${this.$route.params.subreddit || "memes"}/${this.meme.id}`
      );
    }
  },
  watch: {
    share() {
      if (!this.share) this.meme.copied = false;
    }
  }
};
</script>
