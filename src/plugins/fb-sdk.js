/* global FB */
import Vue from "vue";

// https://developers.facebook.com/docs/facebook-login/web
var FBPlugin = {};

const options = {
  appId: "1852298738119636",
  autoLogAppEvents: true,
  xfbml: true,
  version: "v3.2"
};

FBPlugin.install = function(Vue, options) {
  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  window.fbAsyncInit = function() {
    FB.init(options);
    Vue.FB = FB;
    console.log("fb-sdk-ready");
  };
  Vue.FB = undefined;
};

Vue.use(FBPlugin, options);

export default FBPlugin;
