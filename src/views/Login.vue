<template>
  <div id="google-signin-btn"></div>
</template>

<script>
export default {
    mounted() {
        gapi.signin2.render('google-signin-btn', { // this is the button "id"
            scope: 'profile email',
            width: 240,
            height: 50,
            longtitle: true,
            onsuccess: this.onSignIn,
            // onfailure: this.onFailure
            // theme: 'dark',
        })
    },
    methods: {
      onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      },
      signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
      }
    },
      metaInfo: {
      title: 'Memesx',
      // titleTemplate: '%s | My Awesome Webapp'
      meta: [
        { name: 'google-signin-client_id', content:'569258220493-eml45aftpqegtpas801oq5k87pqgad8u.apps.googleusercontent.com'},
      ],
    }
}

</script>
