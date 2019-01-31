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
    onlogin="checkLoginState();">
  </div>
</div>

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

      window.checkLoginState=this.checkLoginState // allow fb button to access this function
      this.checkLoginState();
    },
    methods: {
      checkLoginState() {
        FB.getLoginStatus(response => {
          this.statusChangeCallback(response);
        });
      },
      statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          // testAPI();
        } else {
          // The person is not logged into your app or we are unable to tell.
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        }
      },
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
