<template>
  <v-row>
    <v-col v-for="meme in memes" :key="meme.id" cols="12" lg="4" md="6" sm="12">
      <MemeCard :meme="meme" />
    </v-col>
    <v-col cols="12" slot="placeholder">
      <!-- <v-col
      v-for="skeleton in 25"
      :key="skeleton"
      cols="12"
      lg="4"
      md="6"
      sm="12"
      slot="placeholder"
    >
      <v-skeleton-loader
        type="card, actions"
        class="elevation-2 fill-height"
        height="500px"
      ></v-skeleton-loader> -->
      <v-row align="center" justify="center" style="height: 100%">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import MemeCard from "@/components/MemeCard";
import { GET_MEMES } from "@/store/meme.module";

export default {
  components: {
    MemeCard
  },
  created() {
    this.getMemes();
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
    },
    subreddit() {
      return this.$route.params.subreddit || "memes";
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
    async getMemes() {
      this.$store.dispatch(GET_MEMES, {
        subreddit: this.subreddit
      });
    }
  }
};
</script>
