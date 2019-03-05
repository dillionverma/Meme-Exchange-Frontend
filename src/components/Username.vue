<template>
  <v-card flat>
    <v-card-title>Select Username</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container grid-list-md pb-0>
        <v-form v-model="valid" ref="form" @submit.prevent="update">
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                ref="username"
                v-model="username"
                label="Username"
                hint="Choose wisely"
                placeholder="xX_MeMeLoRd_Xx"
                required
                :rules="[rules.required, rules.counter]"
                counter="20"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-flex text-xs-center>
        <v-btn
          block
          depressed
          :loading="loading"
          :disabled="loading"
          @click="update"
          :color="valid ? 'success' : 'disabled'"
        >
          Submit
        </v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
import { UPDATE_USERNAME } from "@/store/auth.module";

export default {
  data: () => ({
    username: "",
    valid: false,
    rules: {
      required: value => !!value || "This field is required.",
      counter: value =>
        (value.length >= 3 && value.length <= 20) ||
        "Between 3 and 20 characters"
    }
  }),
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        console.log("valid");
        console.log(this.valid);
        if (this.valid) {
          this.$store.dispatch(UPDATE_USERNAME, { username: this.username });
        }
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.authLoading;
    }
  }
};
</script>

<style></style>
