// import ApiService from "@/common/api.service";
import api from "@/lib/api.service";
import JwtService from "@/lib/jwt.service";

// import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from "./actions";
// import { SET_TOKEN, REMOVE_TOKEN } from "./mutations";

// Actions
export const LOGIN = "user/login";
export const LOGOUT = "user/logout";

export const AUTHENTICATE = "USER/AUTHENTICATE";

// Mutations
export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";
export const PURGE_AUTH = "PURGE_AUTH";

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
  [SET_USER](state, data) {
    state.isLoggedIn = true;
    state.user = data.user;
    // state.token = data.token;
    // state.errors = {};
    if (data.token) {
      JwtService.saveToken(data.token);
    }
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
      commit(SET_USER, res.data);
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
      commit(PURGE_AUTH, err.message);
    }
  },
  async [LOGIN]({ commit }, request) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post("/v1/user/third-party-login", request);
      console.log(res);
      commit(SET_USER, res.data);
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
      commit(PURGE_AUTH, err.message);
    }
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  }
  //   [REGISTER](context, credentials) {
  //     return new Promise((resolve, reject) => {
  //       ApiService.post("users", { user: credentials })
  //         .then(({ data }) => {
  //           context.commit(SET_AUTH, data.user);
  //           resolve(data);
  //         })
  //         .catch(({ response }) => {
  //           context.commit(SET_ERROR, response.data.errors);
  //           reject(response);
  //         });
  //     });
  //   },
  //   }
};

export default {
  state,
  getters,
  mutations,
  actions
};
