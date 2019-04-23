// import ApiService from "@/common/api.service";
import api from "@/lib/api.service";
import JwtService from "@/lib/jwt.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";
import { USERNAME_DIALOG } from "./app.module";

// import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
// import { SET_TOKEN, REMOVE_TOKEN } from "./mutations";

// Actions
export const THIRD_PARTY_LOGIN = "auth/third_party_login";
export const LOGIN = "auth/login";
export const LOGOUT = "auth/logout";
export const SIGNUP = "auth/signup";
export const UPDATE_USERNAME = "auth/UPDATE_USERNAME";
export const RESET_ACCOUNT = "auth/RESET_ACCOUNT";

export const AUTHENTICATE = "auth/AUTHENTICATE";

// Mutations
export const SET_CURRENT_USER = "auth/SET_CURRENT_USER";
export const SET_LOADING = "auth/loading";
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
    console.log("purge");
    state.isLoggedIn = false;
    state.user = {};
    JwtService.destroyToken();
    localStorage.removeItem("userId");
  }
};

// Actions
const actions = {
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
