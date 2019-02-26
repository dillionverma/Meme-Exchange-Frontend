import api from "@/lib/api.service";

// Actions
export const LEADERBOARD = "LEADERBOARD";

// Mutations
export const SET_LOADING = "leaderboard/loading";
export const SET_LEADERBOARD = "SET_LEADERBOARD";

// State
const state = {
  leaderboard: [],
  loading: false
};

// Getters
const getters = {
  leaderboard(state) {
    return state.leaderboard;
  }
};

// Mutations
const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_LEADERBOARD](state, leaderboard) {
    state.leaderboard = leaderboard;
  }
};

// Actions
const actions = {
  async [LEADERBOARD]({ commit }) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get("/v1/leaderboard");
      let rankedData = res.data.map((data, i) => {
        return {
          ...data,
          rank: i + 1
        };
      });
      console.log(rankedData);
      commit(SET_LEADERBOARD, rankedData);
      commit(SET_LOADING, false);
    } catch (err) {
      console.log(err.message);
      // commit(ERROR, err.message);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
