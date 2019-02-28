// import ApiService from "@/common/api.service";
import api from "@/lib/api.service";
import JwtService from "@/lib/jwt.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";

// import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
// import { SET_TOKEN, REMOVE_TOKEN } from "./mutations";

// Actions
export const LOGIN = "auth/login";
export const LOGOUT = "auth/logout";
export const SIGNUP = "auth/signup";

export const AUTHENTICATE = "auth/AUTHENTICATE";

// Mutations
export const SET_USER = "auth/SET_USER";
export const SET_LOADING = "auth/loading";
export const PURGE_AUTH = "auth/PURGE_AUTH";

// State
const state = {
  user: {},
  isLoggedIn: false,
  isLoading: false
};

// Getters
const getters = {
  currentUser(state) {
    return state.user;
  },
  isLoggedIn(state) {
    return state.isLoggedIn;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_USER](state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  [PURGE_AUTH](state) {
    console.log("purge");
    state.isLoggedIn = false;
    state.user = {};
    JwtService.destroyToken();
  }
};

// Actions
const actions = {
  async [AUTHENTICATE]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get("/v1/user/", {});
      console.log(res);
      commit(SET_USER, res.data.user);
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
    }
  },
  async [LOGIN]({ commit }, request) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/third-party-login", request);
      console.log(res);
      commit(SET_USER, res.data.user);
      if (res.data.token) {
        JwtService.saveToken(res.data.token);
      }
      commit(SUCCESS, {
        message: "Successfully logged in",
        link: null
      });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
    }
  },
  [LOGOUT]({ commit }) {
    commit(PURGE_AUTH);
    commit(SUCCESS, {
      message: "Successfully logged out",
      link: null
    });
  },
  async [SIGNUP]({ commit }, credentials) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/signup", credentials);
      console.log(res);
      commit(SET_USER, res.data.user);
      if (res.data.token) {
        JwtService.saveToken(res.data.token);
      }
      commit(SUCCESS, {
        message: "Successfully signed up",
        link: null
      });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(PURGE_AUTH, err.message);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
