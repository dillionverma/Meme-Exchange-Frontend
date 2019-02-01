<template>
  <div>
    <div id="google-signin-btn"></div>
    <div
      class="fb-login-button"
      data-size="large"
      data-button-type="login_with"
      data-auto-logout-link="false"
      data-use-continue-as="false"
      scope="public_profile,email"
      onlogin="onFBReady();"
    ></div>
  </div>
</template>

<script>
/* global gapi FB */
import { LOGIN } from "@/store/auth.module";

export default {
  mounted() {
    gapi.signin2.render("google-signin-btn", {
      // this is the button "id"
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      onsuccess: this.onSignIn
      // onfailure: this.onFailure
      // theme: 'dark',
    });
    window.onFBReady = this.onFBReady
    // window.addEventListener("fb-sdk-ready", this.onFBReady);
  },
  beforeDestroy: function() {
    // window.removeEventListener("fb-sdk-ready", this.onFBReady);
  },
  methods: {
    onFBReady() {
      if (!this.$store.getters.isLoggedIn) {
        FB.getLoginStatus(response => {
          this.onFBLogin(response);
        });
      }
    },
    signInMemesx(request) {
      this.$store.dispatch(LOGIN, request);
    },
    onFBLogin(response) {
      if (response.status === "connected") {
        // Logged into your app and Facebook.
        const request = {
          provider_name: "facebook",
          provider_side_id: response.authResponse.userID,
          auth_token: response.authResponse.accessToken,
          auth_expires_at: response.authResponse.data_access_expiration_time
        };
        console.log("facebook", request);
        this.signInMemesx(request);
      } else {
        console.log("Please log in")
      }
    },
    onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();

      // The ID token you need to pass to your backend:
      var authResponse = googleUser.getAuthResponse();

      const request = {
        provider_name: "google",
        provider_side_id: profile.getId(),
        auth_token: authResponse.id_token,
        auth_expires_at: authResponse.expires_at
      };
      console.log("google", request);
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  },
  metaInfo: {
    title: "Memesx",
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
