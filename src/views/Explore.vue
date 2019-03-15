<template>
  <v-container grid-list-xl fluid>
    <v-layout ref="memes" col wrap>
      <v-flex v-for="meme in memes" :key="meme.id" xs12 md4 d-flex>
        <MemeCard :meme="meme" />
      </v-flex>
    </v-layout>
    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
      <v-progress-circular :size="70" :width="7" indeterminate color="primary">
      </v-progress-circular>
    </v-layout>
  </v-container>
</template>

<script>
import MemeCard from "@/components/MemeCard";
import { GET_MEMES } from "@/store/meme.module";

export default {
  components: {
    MemeCard
  },
  created() {
    if (this.$store.getters.memes.length == 0) {
      this.getMemes();
    }
  },
  mounted() {
    this.scroll();
  },
  computed: {
    loading() {
      return this.$store.getters.memeLoading;
    },
    memes() {
      return this.$store.getters.memes;
    }
  },
  watch: {
    "$route.params.subreddit": function() {
      this.getMemes();
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight + 2 >= // some devices dont have it exactly equal, hence +2
          document.documentElement.scrollHeight;
        if (bottomOfWindow && !this.loading && !this._isBeingDestroyed) {
          this.getMemes();
        }
      };
    },
    getMemes() {
      this.$store.dispatch(GET_MEMES, {
        subreddit: this.$route.params.subreddit || "memes"
      });
    }
  }
};
</script>
