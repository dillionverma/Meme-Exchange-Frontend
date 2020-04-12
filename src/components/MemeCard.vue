<template>
  <!-- <v-skeleton-loader :loading="loading" type="card, actions"> -->
  <v-card style="max-width: 500px; margin: 0 auto">
    <v-img
      :src="this.meme.url"
      v-on:load="imageLoaded"
      aspect-ratio="1"
      contain
      @click="goToMeme"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height" align="center" justify="center">
          <v-skeleton-loader
            type="image"
            loading
            height="100%"
            width="100%"
          ></v-skeleton-loader>
        </v-row>
      </template>
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
        <template v-slot:activator="{ on: { click } }">
          <v-btn @click="click" color="success" small>Buy</v-btn>
        </template>
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
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>share</v-icon>
          </v-btn>
        </template>
        <Share :meme="meme" :onClose="onClose" />
      </v-dialog>
    </v-card-actions>
  </v-card>
  <!-- </v-skeleton-loader> -->
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
    meme: Object,
    loading: Boolean
  },
  data: () => ({
    share: false,
    buy: false,
    observer: null,
    intersected: false,
    imageLoading: true
  }),
  methods: {
    imageLoaded() {
      this.imageLoading = false;
    },
    androidShare() {
      if (navigator.share) {
        navigator
          .share({
            title: `${this.meme.title} | Meme Exchange`,
            text: this.meme.title,
            url:
              window.location.origin +
              "/r/" +
              this.meme.subreddit +
              "/" +
              this.meme.id
          })
          .then(() => console.log("Successful share"))
          .catch(error => console.log("Error sharing", error));
      }
    },
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

<style>
.v-card__text,
.v-card__title {
  word-break: normal; /* Stop wordbreaking from occuring */
}

.v-skeleton-loader__image {
  height: 100%;
  border-radius: 0;
}
</style>
