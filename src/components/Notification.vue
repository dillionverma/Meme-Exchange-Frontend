<template>
  <v-snackbar :color="status" v-model="notification">
    {{ message }}
    <v-btn dark flat :to="link" @click="close">{{ linkText }}</v-btn>
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
