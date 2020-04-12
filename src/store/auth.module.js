/* global gapi FB FederatedCredential PasswordCredential */

// import ApiService from "@/common/api.service";
import api from "@/lib/api.service";
import JwtService from "@/lib/jwt.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";
import { USERNAME_DIALOG, LOGIN_DIALOG, MENU } from "./app.module";

// Consts
const GOOGLE_PROVIDER = "https://accounts.google.com";
const FACEBOOK_PROVIDER = "https://www.facebook.com";
const DEFAULT_IMG = ""; // TODO: add default image later

// import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
// import { SET_TOKEN, REMOVE_TOKEN } from "./mutations";

// Actions
export const AUTOMATIC_LOGIN = "auth/automatic_login";
export const LOGIN = "auth/login";
export const LOGIN_GOOGLE = "auth/login_google";
export const LOGIN_FACEBOOK = "auth/login_facebook";

export const LOGOUT = "auth/logout";
export const LOGOUT_GOOGLE = "auth/logout_google";
export const LOGOUT_FACEBOOK = "auth/logout_facebook";

export const AUTHENTICATE = "auth/AUTHENTICATE";
export const THIRD_PARTY_LOGIN = "auth/third_party_login";
export const SIGNUP = "auth/signup";
export const UPDATE_USERNAME = "auth/UPDATE_USERNAME";
export const RESET_ACCOUNT = "auth/RESET_ACCOUNT";

// Mutations
export const SET_LOADING = "auth/loading";
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const PURGE_AUTH = "auth/PURGE_AUTH";

// State
const state = {
  user: {},
  isLoggedIn: false,
  loading: false
};

// Getters
const getters = {
  currentUser(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  authLoading(state) {
    return state.loading;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_CURRENT_USER](state, user) {
    state.isLoggedIn = true;
    state.user = user;
    localStorage.setItem("userId", user.id);
  },
  [PURGE_AUTH](state) {
    state.isLoggedIn = false;
    state.user = {};
    JwtService.destroyToken();
    localStorage.removeItem("userId");
  }
};

// Actions
const actions = {
  async [AUTOMATIC_LOGIN]({ commit, dispatch }) {
    // https://developers.google.com/web/fundamentals/security/credential-management
    if (window.PasswordCredential || window.FederatedCredential) {
      if (!state.isLoggedIn) {
        navigator.credentials
          .get({
            password: true, // Obtain password credentials or not
            federated: {
              // Obtain federation credentials or not
              providers: [
                // Specify an array of IdP strings
                GOOGLE_PROVIDER,
                FACEBOOK_PROVIDER
              ]
            },
            mediation: "optional"
          })
          .then(cred => {
            if (cred) {
              if (cred.type == "password") {
                // https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential
                dispatch(LOGIN, {
                  email: cred.id,
                  password: cred.password
                });
              } else if (cred.type == "federated") {
                // `provider` contains the identity provider string
                switch (cred.provider) {
                  case GOOGLE_PROVIDER:
                    var GoogleAuth = gapi.auth2.getAuthInstance();
                    // https://developers.google.com/identity/sign-in/web/reference#googleauthsignin
                    GoogleAuth.signIn().then(GoogleUser => {
                      dispatch(LOGIN_GOOGLE, GoogleUser);
                    });
                    break;
                  case FACEBOOK_PROVIDER:
                    dispatch(LOGIN_FACEBOOK);
                    break;
                  default:
                    // Show login dialog
                    commit(LOGIN_DIALOG, true);
                    commit(MENU, false);
                    break;
                }
              }
              // if the credential is `undefined`
            } else {
              // Show login dialog
              commit(LOGIN_DIALOG, true);
              commit(MENU, false);
            }
          });
      }
    } else {
      // Show login dialog
      commit(LOGIN_DIALOG, true);
      commit(MENU, false);
    }
  },
  async [AUTHENTICATE]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get("/v1/user/", {});
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
      commit(SET_LOADING, false);
    }
  },
  async [LOGIN]({ commit }, request) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/login", request);
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      if (res.data.token) {
        JwtService.saveToken(res.data.token);
      }
      commit(SUCCESS, {
        message: "Successfully signed in"
      });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
      commit(SET_LOADING, false);
    }
  },
  async [LOGIN_GOOGLE]({ dispatch }, GoogleUser) {
    // https://developers.google.com/identity/sign-in/web/reference#googleauthsignin
    // https://developers.google.com/identity/sign-in/web/sign-in
    var profile = GoogleUser.getBasicProfile();
    // The ID token you need to pass to your backend:
    var authResponse = GoogleUser.getAuthResponse();

    // Ask to store password
    const credentials = new FederatedCredential({
      id: profile.getEmail(),
      name: profile.getName(),
      iconURL: profile.getImageUrl() || DEFAULT_IMG,
      provider: GOOGLE_PROVIDER
    });
    navigator.credentials.store(credentials);

    dispatch(THIRD_PARTY_LOGIN, {
      provider_name: "google",
      provider_side_id: profile.getId(),
      auth_token: authResponse.id_token,
      auth_expires_at: authResponse.expires_at
    });
  },
  [LOGIN_FACEBOOK]({ dispatch }) {
    // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
    FB.getLoginStatus(response => {
      // Already logged in to Facebook
      if (response.status === "connected") {
        FB.api("/me?fields=id,name,email,picture", function(response) {
          // Ask to store password
          const credentials = new FederatedCredential({
            id: response.email,
            name: response.name,
            iconURL: response.picture.data.url || DEFAULT_IMG,
            provider: FACEBOOK_PROVIDER
          });
          navigator.credentials.store(credentials);
        });

        // Login to backend-server
        dispatch(THIRD_PARTY_LOGIN, {
          provider_name: "facebook",
          provider_side_id: response.authResponse.userID,
          auth_token: response.authResponse.accessToken,
          auth_expires_at: response.authResponse.data_access_expiration_time
        });

        // Not logged into facebook
      } else {
        // Attempt to log into Facebook
        FB.login(response => {
          if (response.authResponse) {
            // Login to backend-server
            dispatch(THIRD_PARTY_LOGIN, {
              provider_name: "facebook",
              provider_side_id: response.authResponse.userID,
              auth_token: response.authResponse.accessToken,
              auth_expires_at: response.authResponse.data_access_expiration_time
            });
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        });
      }
    });
  },
  async [THIRD_PARTY_LOGIN]({ commit }, request) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/third-party-login", request);
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      if (res.data.token) {
        JwtService.saveToken(res.data.token);
      }
      commit(SUCCESS, {
        message: "Successfully signed in"
      });
      if (res.data.new) {
        commit(USERNAME_DIALOG, true);
      }
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
      commit(SET_LOADING, false);
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
    commit(SUCCESS, {
      message: "Successfully signed out"
    });

    // Prevent autosign-in
    // https://developers.google.com/web/fundamentals/security/credential-management/retrieve-credentials#sign-out
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  },
  async [LOGOUT_GOOGLE]({ commit }) {
    // https://developers.google.com/identity/sign-in/web/reference#googleauthsignout
    if (gapi.auth2 === undefined) return;
    try {
      const GoogleAuth = await gapi.auth2.getAuthInstance();
      await GoogleAuth.signOut();
      console.log("Google user signed out.");
    } catch (err) {
      handleError(commit, err);
      console.log(err.message);
    }

    // Prevent autosign-in
    // https://developers.google.com/web/fundamentals/security/credential-management/retrieve-credentials#sign-out
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  },
  [LOGOUT_FACEBOOK]() {
    // https://developers.facebook.com/docs/reference/javascript/FB.logout
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FB.logout();
      }
    });
    // Prevent autosign-in
    // https://developers.google.com/web/fundamentals/security/credential-management/retrieve-credentials#sign-out
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  },
  async [UPDATE_USERNAME]({ commit }, params) {
    commit(SET_LOADING, true);
    try {
      const res = await api.put(`/v1/user/username`, params);
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      commit(SUCCESS, {
        message: "Successfully changed username",
        link: "/user/" + res.data.user.username,
        linkText: "View Profile"
      });
      commit(USERNAME_DIALOG, false);
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      console.log(err.message);
      commit(SET_LOADING, false);
    }
  },
  async [RESET_ACCOUNT]({ commit }, payload) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post(`/v1/user/reset`, payload);
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      commit(SUCCESS, {
        message: "Successfully reset account",
        link: "/user/" + res.data.user.username,
        linkText: "View Profile"
      });
      payload.onSuccess();
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      console.log(err.message);
      commit(SET_LOADING, false);
    }
  },
  async [SIGNUP]({ commit }, credentials) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/signup", credentials);
      console.log(res);
      commit(SET_CURRENT_USER, res.data.user);
      if (res.data.token) {
        JwtService.saveToken(res.data.token);
      }

      // Ask user to store username and password for future logins
      // https://developers.google.com/web/updates/2016/04/credential-management-api
      // https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential

      // TODO: Implement actual rememberMe on backend too
      if (window.PasswordCredential && credentials.rememberMe) {
        var cred = new PasswordCredential({
          id: credentials.email,
          password: credentials.password,
          name: credentials.username,
          iconURL: res.data.user.avatar || DEFAULT_IMG
        });
        navigator.credentials.store(cred);
      }

      commit(SUCCESS, {
        message: "Successfully signed up",
        link: "/user/" + res.data.user.username,
        linkText: "View Profile"
      });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
      commit(SET_LOADING, false);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
