<template>
  <v-card flat>
    <v-tabs grow v-model="tabs">
      <v-tab href="#sign-up">
        Sign Up
      </v-tab>
      <v-tab href="#sign-in">
        Sign In
      </v-tab>
    </v-tabs>
    <v-container grid-list-md text-xs-center>
      <v-layout wrap>
        <v-flex xs12>
          <div id="google-signin-btn"></div>
        </v-flex>
        <v-flex xs12>
          <div
            class="fb-login-button"
            data-size="large"
            data-button-type="login_with"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            scope="public_profile,email"
            onlogin="loginFacebook()"
          ></div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex id="or">or</v-flex>
    <v-tabs-items v-model="tabs">
      <v-tab-item value="sign-up">
        <v-card-text>
          <v-container grid-list-md pb-0>
            <v-form v-model="valid" ref="form">
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
                <v-flex xs12>
                  <v-text-field
                    ref="email"
                    v-model="email"
                    label="Email"
                    hint="We won't spam you, we promise"
                    placeholder="your_mom69@inbox.com"
                    required
                    :rules="[rules.required, rules.email]"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    ref="password"
                    v-model="password"
                    label="Password"
                    hint="Don't use 'password'."
                    placeholder="iamaweeb123"
                    :rules="[rules.required]"
                    :append-icon="visible ? 'visibility' : 'visibility_off'"
                    :type="visible ? 'text' : 'password'"
                    @click:append="() => (visible = !visible)"
                    required
                    min="8"
                    counter
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-flex text-xs-center>
            <v-btn
              block
              depressed
              :loading="loading"
              :disabled="loading"
              @click="signUp"
              :color="valid ? 'success' : 'disabled'"
              >Sign Up</v-btn
            >
          </v-flex>
        </v-card-actions>
      </v-tab-item>
      <v-tab-item value="sign-in">
        <v-card-text>
          <v-container grid-list-md pb-0>
            <v-form v-model="valid" ref="form">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    ref="email"
                    v-model="email"
                    label="Email"
                    hint="We won't spam you, we promise"
                    placeholder="your_mom69@inbox.com"
                    required
                    :rules="[rules.required, rules.email]"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    ref="password"
                    v-model="password"
                    label="Password"
                    hint="Don't use 'password'."
                    placeholder="iamaweeb123"
                    :rules="[rules.required]"
                    :append-icon="visible ? 'visibility' : 'visibility_off'"
                    :type="visible ? 'text' : 'password'"
                    @click:append="() => (visible = !visible)"
                    required
                    min="8"
                    counter
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember me"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-flex text-xs-center>
            <v-btn
              block
              depressed
              :loading="loading"
              :disabled="loading"
              @click="login"
              :color="valid ? 'success' : 'disabled'"
              >Login</v-btn
            >
          </v-flex>
        </v-card-actions>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
/* global gapi */
import { LOGIN, LOGIN_FACEBOOK, LOGIN_GOOGLE, THIRD_PARTY_LOGIN, SIGNUP } from "@/store/auth.module";

export default {
  data: () => ({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
    visible: false,
    valid: false,
    tabs: "sign-up",
    rules: {
      required: value => !!value || "This field is required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  mounted() {
  // https://gist.github.com/sleepingpig/afe590dad79433fbce7c62c2a72d64c9
   gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '569258220493-eml45aftpqegtpas801oq5k87pqgad8u.apps.googleusercontent.com',
      });
      gapi.signin2.render("google-signin-btn", {
        width: 236,
        height: 50,
        longtitle: true,
        onsuccess: this.loginGoogle
        // onfailure: this.onFailure
        // theme: 'dark',
      });
    });

    window.loginFacebook = this.loginFacebook;
  },
  computed: {
    loading() {
      return this.$store.getters.authLoading;
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        console.log("valid", this.valid);
        if (!this.$store.getters.isLoggedIn) {
          this.$store.dispatch(LOGIN, {
            email: this.email,
            password: this.password
          });
        }
      }
    },
    signUp() {
      if (this.$refs.form.validate()) {
        console.log("valid", this.valid);
        this.$store.dispatch(SIGNUP, {
          username: this.username,
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe
        });
      }
    },
    loginFacebook() {
      this.$store.dispatch(LOGIN_FACEBOOK);
    },
    loginGoogle(GoogleUser) {
      this.$store.dispatch(LOGIN_GOOGLE, GoogleUser);
    }
  },
  metaInfo: {
    // title: "Meme Exchange",
    // titleTemplate: '%s | My Awesome Webapp'
    meta: [
      {
        name: "google-signin-client_id",
        content:
          "569258220493-eml45aftpqegtpas801oq5k87pqgad8u.apps.googleusercontent.com"
      }
    ]
  }
};
</script>

<style lang="scss">
#google-signin-btn > div {
  // width: 100% !important
  display: inline-flex;
}

#or {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.87);
  &:after,
  &:before {
    content: "";
    display: block;
    background: rgba(0, 0, 0, 0.12);
    width: 50%;
    height: 1px;
    margin: 0 10px;
  }
}
</style>
