<template>
  <v-snackbar :color="status" v-model="notification" :style="snackStyle">
    {{ message }}
    <v-btn dark text :to="link" @click="close">{{ linkText }}</v-btn>
    <v-btn icon @click="notification = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { CLEAR } from "@/store/notification.module";

export default {
  data() {
    return {
      notification: false
    };
  },
  methods: {
    close() {
      this.notification = false;
      this.$store.commit(CLEAR);
    }
  },
  computed: {
    snackStyle() {
      return {
        "--snack-bottom": !this.$vuetify.breakpoint.lgAndUp ? "65px" : "10px"
        // "z-index": !this.$vuetify.breakpoint.lgAndUp ? 4 : 5
      };
    },
    message() {
      return this.$store.getters.message;
    },
    link() {
      return this.$store.getters.link;
    },
    linkText() {
      return this.$store.getters.linkText;
    },
    status() {
      return this.$store.getters.status;
    }
  },
  watch: {
    message: function() {
      console.log(this.message);
      if (this.message !== "") {
        this.notification = true;
        setTimeout(() => this.$store.commit(CLEAR), 6500); // This is to reset the data in notification
      }
    }
  }
};
</script>

<style lang="scss">
.v-snack--bottom {
  bottom: var(--snack-bottom);
}
</style>
