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
      <v-list-tile @click="() => {}">
        <v-list-tile-action>
          <v-icon color="indigo">fab fa-facebook</v-icon>
        </v-list-tile-action>
        <v-card-title>Facebook</v-card-title>
      </v-list-tile>
      <v-list-tile @click="() => {}">
        <v-list-tile-action>
          <v-icon color="cyan">fab fa-twitter</v-icon>
        </v-list-tile-action>
        <v-card-title>Twitter</v-card-title>
      </v-list-tile>
      <v-list-tile @click="() => {}">
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
export default {
  props: {
    meme: Object,
    onClose: Function
  },
  methods: {
    copy() {
      const markup = this.$refs.link;
      markup.focus();
      document.execCommand("selectAll", false, null);
      this.meme.copied = document.execCommand("copy");
    }
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
  }
};
</script>
