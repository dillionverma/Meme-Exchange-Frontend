<template>
  <v-layout column pb-5>
    <v-flex d-flex align-self-start shrink>
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </v-flex>
    <v-flex d-flex align-self-center>
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
          name: "og:type",
          content: "website"
        },
        {
          name: "og:url",
          content: window.location.href
        },
        {
          name: "og:image",
          content: this.meme.url
        },
        {
          name: "og:description",
          content: "Invest in this meme today on the Meme Exchange!"
        },
        {
          vmid: "og:site_name",
          name: "og:site_name",
          content: "Meme Exchange"
        }
      ]
    };
  }
};
</script>
