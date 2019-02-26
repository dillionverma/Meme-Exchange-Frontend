import api from "@/lib/api.service";
import { ERROR, SUCCESS } from "./notification.module";

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
const getters = {};

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
  async [BUY_MEME]({ commit }, payload) {
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
        link: "/me" // TODO: Change snack link
      });
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        commit(ERROR, {
          message: err.response.data.errors[0].detail
        });
      } else if (err.request) {
        console.log(err.request);
        commit(ERROR, err.request);
      } else {
        console.log(err.message);
        commit(ERROR, err.message);
      }
      commit(SET_LOADING, false);
    }
  },
  async [SELL_MEME]({ commit }, payload) {
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
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        commit(ERROR, err.response.data.errors[0].detail);
      } else if (err.request) {
        console.log(err.request);
        commit(ERROR, err.request);
      } else {
        console.log(err.message);
        commit(ERROR, err.message);
      }
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
