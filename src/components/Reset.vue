<template>
  <v-card>
    <v-card-title class="headline"
      >Are you sure you want to reset your account?</v-card-title
    >

    <v-card-text>
      <v-alert value="true" type="error" icon="warning">
        <b>This action will delete all holdings</b> and reset account back to
        1000 coins. <br />
        <b>There is no going back!</b>
      </v-alert>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="close">
        Keep my account
      </v-btn>

      <v-btn color="error" @click="reset" :loading="loading">
        Reset my account
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { RESET_ACCOUNT } from "@/store/auth.module";

export default {
  methods: {
    reset() {
      this.$store.dispatch(RESET_ACCOUNT, {
        onSuccess: this.close
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.authLoading;
    }
  },
  props: {
    close: Function
  }
}
</script>
