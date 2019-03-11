import api from "@/lib/api.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";
import { GET_USER, GET_TRANSACTIONS } from "./user.module";

// Actions
export const GET_MEMES = "MEME_GET";
export const BUY_MEME = "MEME_BUY";
export const SELL_MEME = "MEME_SELL";

// Mutations
export const SET_STATUS = "SET_STATUS";
export const SET_SUBREDDIT = "SET_SUBREDDIT";
export const SET_AFTER = "SET_AFTER";
export const SET_MEMES = "SET_MEMES";
export const CLEAR_MEMES = "CLEAR_MEMES";
export const SET_LOADING = "meme/loading";

// State
const state = {
  status: "",
  statusText: "",
  data: "",
  loading: false,
  after: "",
  memes: []
};

// Getters
const getters = {
  memeLoading(state) {
    return state.loading;
  },
  memes(state) {
    return state.memes;
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
  },
  [SET_SUBREDDIT](state, subreddit) {
    state.subreddit = subreddit;
  },
  [SET_AFTER](state, after) {
    state.after = after;
  },
  [SET_MEMES](state, memes) {
    state.memes.push(...memes);
  },
  [CLEAR_MEMES](state) {
    state.memes = [];
    state.after = "";
    state.subreddit = "";
  }
};

// Actions
const actions = {
  // {
  //   subreddit: "memes",
  //   after: "t3_d92md",
  // }
  async [GET_MEMES]({ commit, state }, payload) {
    commit(SET_LOADING, true);

    // Clear memes from current state
    if (state.subreddit != payload.subreddit) {
      commit(CLEAR_MEMES);
    }

    try {
      const res = await window.reddit.get(`/r/${payload.subreddit}.json`, {
        after: state.after || null
      });

      console.log(parse(res));

      commit(SET_MEMES, parse(res));
      commit(SET_AFTER, res.data.after);
      commit(SET_SUBREDDIT, payload.subreddit);
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(SET_LOADING, false);
    }
  },

  // {
  //   id: "JF3J5",
  //   quantity: 4,
  //   username: 'meme_lord',
  //   onSuccess: onSuccess
  // }
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
      payload.onSuccess();
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

const parse = json => {
  let memes = [];
  json.data.children.forEach(meme => {
    meme = meme.data;
    if (!meme.is_self) {
      let obj = {
        id: meme.id,
        title: meme.title,
        url: meme.url,
        author: meme.author,
        score: meme.score,
        created: meme.created,
        permalink: meme.permalink,
        subreddit: meme.subreddit,
        thumbnail: meme.thumbnail,
        copied: false
      };
      if (
        meme.domain == "youtu.be" ||
        meme.domain == "discord.gg" ||
        meme.domain == "i.imgur.com"
      ) {
        obj.url = "";
      } else if (
        (meme.domain == "gfycat.com" || meme.domain == "imgur.com") &&
        meme.media
      ) {
        obj.url = meme.media.oembed.thumbnail_url;
      }
      memes.push(obj);
    }
  });
  return memes;
};
