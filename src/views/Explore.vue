<template>
  <v-container grid-list-xl fluid>
    <v-layout col wrap>
      <v-flex v-for="meme in memes" :key="meme.id" xs12 md4 d-flex>
        <v-card flat tile>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>remove</v-icon>
            </v-btn> -->
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"
        v-if="loading"
      >
      </v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  beforeMount() {
    this.getMemes();
  },
  mounted() {
    this.scroll();
    this.subreddit = this.$route.params.subreddit;
  },
  data: () => ({
    memes: [],
    after: "",
    loading: false,
    subreddit: ""
  }),
  watch: {
    "$route.params.subreddit": function(subreddit) {
      this.memes = [];
      this.subreddit = subreddit;
      this.after = "";
      this.getMemes();
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && !this.loading) {
          this.getMemes();
        }
      };
    },
    getMemes() {
      this.loading = true;
      this.axios
        .get(
          `/reddit/r/${this.$route.params.subreddit}.json?after=${this.after}`
        )
        .then(res => {
          this.memes.push(...this.parse(res));
          this.after = res.data.data.after;
          this.loading = false;
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    parse(json) {
      let memes = [];
      json.data.data.children.forEach(meme => {
        meme = meme.data;
        if (!meme.is_self) {
          let obj = {
            id: meme.id,
            title: meme.title,
            url: meme.url,
            author: meme.author,
            score: meme.score,
            created: meme.created,
            permalink: meme.permalink,
            subreddit: meme.subreddit,
            thumbnail: meme.thumbnail
          };
          if (meme.domain == "youtu.be") {
            obj.url = "";
          } else if (
            (meme.domain == "gfycat.com" || meme.domain == "imgur.com") &&
            meme.media
          ) {
            obj.url = meme.media.oembed.thumbnail_url;
          }
          memes.push(obj);
        }
      });
      return memes;
    }
  }
};
</script>
