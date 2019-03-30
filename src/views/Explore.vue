<template>
  <v-layout column>
    <v-flex d-flex xs12 grow>
      <v-container grid-list-xl fluid fill-height>
        <v-layout ref="memes" row wrap pb-5>
          <v-flex v-for="meme in memes" :key="meme.id" d-flex xs12 md4>
            <MemeCard :meme="meme" />
          </v-flex>
          <v-flex slot="placeholder" d-flex xs12 align-center justify-center>
            <div style="flex: none !important">
              <v-progress-circular
                :size="70"
                :width="7"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
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
