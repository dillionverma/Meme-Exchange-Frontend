<template>
  <v-layout justify-center fill-height>
    <v-flex xs12 md6 offset-md-3>
      <v-card>
        <v-img
          :src="meme.url"
          :lazy-src="meme.thumbnail"
          aspect-ratio="1"
          class="grey lighten-2"
          contain
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-layout>
        </v-img>
        <v-card-title primary-title class="align-start">
          <div>
            <span class="headline">{{ meme.title }}</span>
            <div class="grey--text font-weight-light">
              {{ meme.score ? meme.score.toLocaleString() : null }}
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
          <!-- <v-btn icon>
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
    </v-flex>
  </v-layout>
</template>

<script>
import Buy from "@/components/Meme.Buy";
import Share from "@/components/Meme.Share";

export default {
  components: {
    Buy,
    Share
  },
  beforeMount() {
    this.getMeme();
  },
  data: () => ({
    share: false,
    buy: false,
    loading: false,
    meme: {}
  }),
  methods: {
    bought() {
      this.buy = false;
    },
    onClose() {
      this.share = false;
    },
    async getMeme() {
      this.loading = true;
      try {
        const res = await this.reddit.get(
          `/by_id/t3_${this.$route.params.reddit_id}.json`
        );
        this.meme = this.parse(res.data.children[0].data);
        console.log(this.meme);
        this.loading = false;
      } catch (e) {
        console.log(e.message);
      }
    },
    parse(meme) {
      let obj = {};
      if (!meme.is_self) {
        obj = {
          id: meme.id,
          title: meme.title,
          url: meme.url,
          author: meme.author,
          score: meme.score,
          created: meme.created,
          permalink: meme.permalink,
          subreddit: meme.subreddit,
          thumbnail: meme.thumbnail,
          copied: false
        };
        if (meme.domain == "youtu.be") {
          obj.url = "";
        } else if (
          (meme.domain == "gfycat.com" || meme.domain == "imgur.com") &&
          meme.media
        ) {
          obj.url = meme.media.oembed.thumbnail_url;
        }
      }
      return obj;
    }
  },
  watch: {
    share() {
      if (!this.share) this.meme.copied = false;
    }
  }
};
</script>
