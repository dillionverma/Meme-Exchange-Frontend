<template>
  <v-card>
    <v-card-title>
      <span class="title font-weight-bold">Share</span>
      <v-spacer></v-spacer>
      <v-btn class="mx-0" icon @click="onClose">
        <v-icon>fa fa-times</v-icon>
      </v-btn>
    </v-card-title>
    <v-list>
      <v-list-tile @click="shareFb">
        <v-list-tile-action>
          <v-icon color="indigo">fab fa-facebook</v-icon>
        </v-list-tile-action>
        <v-card-title>Facebook</v-card-title>
      </v-list-tile>
      <v-list-tile
        :href="
          `https://twitter.com/intent/tweet?url=${shareUrl}&text=Invest+in+this+meme+on+the+Meme+Exchange!&via=memeexchange&hashtags=memes,memeexchange`
        "
        target="blank"
      >
        <v-list-tile-action>
          <v-icon color="cyan">fab fa-twitter</v-icon>
        </v-list-tile-action>
        <v-card-title>Twitter</v-card-title>
      </v-list-tile>
      <v-list-tile
        :href="
          `mailto:?subject=Invest in this Meme&body=Invest in this meme on the Meme Exchange ${shareUrl}`
        "
      >
        <v-list-tile-action>
          <v-icon>fa fa-envelope</v-icon>
        </v-list-tile-action>
        <v-card-title>Email</v-card-title>
      </v-list-tile>
    </v-list>
    <v-text-field
      ref="link"
      :label="meme.copied ? 'Link copied!' : 'Click to copy link'"
      color="success"
      append-icon="far fa-copy"
      @click:append="copy"
      class="pa-3"
      readonly
      :value="shareUrl"
      @click="copy"
    ></v-text-field>
  </v-card>
</template>

<script>
/* global FB */
export default {
  props: {
    meme: Object,
    onClose: Function
  },
  computed: {
    shareUrl() {
      return (
        window.location.origin +
        "/r/" +
        this.meme.subreddit +
        "/" +
        this.meme.id
      );
    }
  },
  methods: {
    copy() {
      const markup = this.$refs.link;
      markup.focus();
      document.execCommand("selectAll", false, null);
      this.meme.copied = document.execCommand("copy");
    },
    shareFb() {
      FB.ui(
        {
          method: "share_open_graph",
          action_type: "og.shares",
          action_properties: JSON.stringify({
            object: {
              "og:url": this.shareUrl, // your url to share
              "og:title": `${this.meme.title} | Meme Exchange`,
              "og:description":
                "Invest in this meme today on the Meme Exchange!",
              "og:image": this.meme.url
            }
          })
        },
        // callback
        function(response) {
          if (response && !response.error_message) {
            // then get post content
            // alert("successfully posted. Status id : " + response.post_id);
          } else {
            // alert("Something went error.");
          }
        }
      );
    }
  }
};
</script>
