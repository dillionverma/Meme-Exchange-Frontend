import api from "@/lib/api.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";
import { GET_USER, GET_TRANSACTIONS } from "./user.module";

// Actions
export const BUY_MEME = "MEME_BUY";
export const SELL_MEME = "MEME_SELL";

// Mutations
export const SET_STATUS = "SET_STATUS";
export const SET_LOADING = "meme/loading";

// State
const state = {
  status: "",
  statusText: "",
  data: ""
};

// Getters
const getters = {
  memeLoading(state) {
    return state.loading;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_STATUS](state, payload) {
    state.status = payload.status;
    state.statusText = payload.statusText;
    state.data = payload.data;
  }
};

// Actions
const actions = {
  async [BUY_MEME]({ commit, dispatch }, payload) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post(`/v1/meme/${payload.id}/buy`, {
        quantity: payload.quantity
      });
      console.log(res);
      commit(SET_STATUS, {
        status: res.status,
        statusText: res.statusText,
        data: res.data
      });
      commit(SUCCESS, {
        message: `${res.data.transaction.quantity} meme${
          res.data.transaction.quantity == 1 ? "" : "s"
        } successfully purchased`,
        link: "/user/" + payload.username,
        linkText: "view"
      });
      dispatch(GET_USER, { username: payload.username });
      dispatch(GET_TRANSACTIONS, { username: payload.username });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(SET_LOADING, false);
    }
  },
  async [SELL_MEME]({ commit, dispatch }, payload) {
    commit(SET_LOADING, true);
    try {
      const res = await api.post(`/v1/meme/${payload.id}/sell`, {
        quantity: payload.quantity
      });
      console.log(res);
      commit(SET_STATUS, {
        status: res.status,
        statusText: res.statusText,
        data: res.data
      });
      commit(SUCCESS, {
        message: `${res.data.transaction.quantity} meme${
          res.data.transaction.quantity == 1 ? "" : "s"
        } successfully sold`,
        link: "/user/" + payload.username,
        linkText: "view"
      });
      dispatch(GET_USER, { username: payload.username });
      dispatch(GET_TRANSACTIONS, { username: payload.username });
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
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
