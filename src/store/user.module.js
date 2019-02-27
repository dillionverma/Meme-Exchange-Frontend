import api from "@/lib/api.service";

// Actions
export const GET_USER = "user/get";

// Mutations
export const SET_USER = "user/SET_USER";
export const SET_LOADING = "user/loading";

// State
const state = {
  user: {},
  isLoading: false
};

// Getters
const getters = {
  user(state) {
    return state.user;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_USER](state, user) {
    state.user = user;
  }
};

// Actions
const actions = {
  async [GET_USER]({ commit }, params) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get(`/v1/user/${params.username}`);
      console.log(res);
      commit(SET_USER, res.data.user);
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
