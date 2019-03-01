import api from "@/lib/api.service";
import { SET_CURRENT_USER } from "./auth.module";

// Actions
export const GET_USER = "user/get";
export const GET_TRANSACTIONS = "user/get_transactions";

// Mutations
export const SET_USER = "user/SET_USER";
export const SET_TRANSACTIONS = "user/SET_TRANSACTIONS";
export const SET_LOADING = "user/loading";

// State
const state = {
  user: {},
  isLoading: false,
  transactions: []
};

// Getters
const getters = {
  user(state) {
    return state.user;
  },
  transactions(state) {
    return state.transactions;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_TRANSACTIONS](state, transactions) {
    state.transactions = transactions;
  }
};

// Actions
const actions = {
  async [GET_USER]({ commit, getters }, params) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get(`/v1/user/${params.username}`);
      console.log(res);
      commit(SET_USER, res.data.user);
      // TODO: kind of sketchy but works for now
      if (getters.currentUser.username == res.data.user.username) {
        commit(SET_CURRENT_USER, res.data.user);
      }
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
      commit(SET_LOADING, false);
    }
  },
  async [GET_TRANSACTIONS]({ commit }, params) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get(`/v1/user/${params.username}/transactions`);
      console.log(res);
      commit(SET_TRANSACTIONS, res.data.transactions);
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
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
