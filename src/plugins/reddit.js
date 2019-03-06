"use strict";

import Vue from "vue";

var Plugin = {};

class Reddit {
  constructor() {
    this.username = process.env.VUE_APP_REDDIT_CLIENT_ID;
    this.password = process.env.VUE_APP_REDDIT_CLIENT_SECRET;
    this.access_token = "";

    this.formData = new FormData();
    this.formData.append("grant_type", "client_credentials");

    this.basicHeader = new Headers();
    this.basicHeader.set(
      "Authorization",
      "Basic " + btoa(this.username + ":" + this.password)
    );

    this.bearerHeader = new Headers();
    // this.connect();
  }

  async connect() {
    console.log("reddit token refresh");
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      body: this.formData,
      method: "post",
      headers: this.basicHeader
    });
    const parsed = await response.json();
    console.log(parsed);
    this.access_token = parsed.access_token;
    return parsed;
  }

  async get(path, params = {}) {
    let url = new URL("https://oauth.reddit.com" + path);
    url.search = new URLSearchParams(params);
    this.bearerHeader.set("Authorization", "Bearer " + this.access_token);
    let response = await fetch(url, {
      headers: this.bearerHeader,
      method: "GET"
    });

    if (response.message == "Unauthorized") {
      await this.connect(); // refresh token if unauthorizaed
      this.bearerHeader.set("Authorization", "Bearer " + this.access_token);
      response = await fetch(url, {
        // fetch again after token refresh
        headers: this.bearerHeader,
        method: "GET"
      });
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

const reddit = new Reddit();

Plugin.install = function(Vue) {
  Vue.reddit = reddit;
  window.reddit = reddit;
  Object.defineProperties(Vue.prototype, {
    reddit: {
      get() {
        return reddit;
      }
    },
    $reddit: {
      get() {
        return reddit;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
