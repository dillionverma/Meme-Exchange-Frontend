<template>
  <v-card>
    <v-card-title class="headline"
      >Are you sure you want to deactivate your account?</v-card-title
    >

    <v-card-text>
      <v-alert :value="true" type="error" icon="warning">
        <b
          >This action will deactivate your account. Your profile will be
          disabled and your information will not be available publicly. You can
          reactivate your account by logging in again.
        </b>
      </v-alert>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="close">
        Keep my account
      </v-btn>

      <v-btn color="error" @click="reset" :loading="loading">
        Deactivate my account
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { DEACTIVATE_ACCOUNT } from "@/store/auth.module";

export default {
  methods: {
    reset() {
      this.$store.dispatch(DEACTIVATE_ACCOUNT, {
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
};
</script>
