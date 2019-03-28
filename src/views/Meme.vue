<template>
  <v-layout justify-center fill-height>
    <v-flex xs12 md6 offset-md-3>
      <MemeCard :meme="meme" />
    </v-flex>
  </v-layout>
</template>

<script>
import MemeCard from "@/components/MemeCard";

export default {
  components: {
    MemeCard
  },
  beforeMount() {
    this.getMeme();
  },
  data: () => ({
    loading: false,
    meme: {
      score: 0
    }
  }),
  methods: {
    async getMeme() {
      this.loading = true;
      try {
        const res = await this.reddit.get(
          `/by_id/t3_${this.$route.params.reddit_id}.json`
        );
        console.log(res.data.children[0].data);
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
  }
};
</script>
