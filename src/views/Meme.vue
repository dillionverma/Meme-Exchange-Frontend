<template>
  <v-row pb-5 class="align-self-start">
    <v-col cols="12">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-col>
    <v-col cols="12">
      <MemeCard :loading="loading" :meme="meme" />
    </v-col>
  </v-row>
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
      score: 0,
      subreddit: ""
    }
  }),
  computed: {
    items() {
      return [
        {
          disabled: false,
          text: `${this.$route.params.subreddit}`,
          to: `/r/${this.$route.params.subreddit}/`,
          exact: true
        },
        {
          text: this.meme.title,
          to: "",
          disabled: true,
          exact: true
        }
      ];
    }
  },
  methods: {
    // TODO: Move this all to vuex
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
  },
  metaInfo() {
    return {
      title: this.meme.title,
      titleTemplate: "%s | Meme Exchange",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Invest in the future of this meme today on the Meme Exchange!"
        },

        // ********* Twitter *********
        {
          name: "twitter:card",
          content: this.meme.url
        },
        {
          name: "twitter:site",
          content: "" // TODO: Twitter publisher handle
        },
        {
          name: "twitter:title",
          content: `${this.meme.title} | Meme Exchange`
        },
        {
          name: "twitter:description",
          content: "Invest in this meme today on the Meme Exchange!"
        },
        {
          name: "twitter:creator",
          content: "" // TODO: Twitter creator handle
        },
        {
          name: "twitter:image:src",
          content: this.meme.url // large image url
        },

        // ********* OpenGraph / Facebook *********

        {
          vmid: "og:title",
          name: "og:title",
          content: `${this.meme.title} | Meme Exchange`
        },
        {
          name: "og:image",
          content: this.meme.url
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: "Invest in this meme today on the Meme Exchange!"
        }
      ]
    };
  }
};
</script>
