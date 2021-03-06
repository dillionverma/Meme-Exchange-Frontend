import api from "@/lib/api.service";
import { handleError } from "@/lib/helpers";
import { SUCCESS } from "./notification.module";
import { GET_USER, GET_TRANSACTIONS } from "./user.module";

// Actions
export const GET_MEMES = "MEME_GET";
export const BUY_MEME = "MEME_BUY";
export const SELL_MEME = "MEME_SELL";
export const SELL_MEME_PRICE = "MEME_SELL_PRICE";

// Mutations
export const SET_STATUS = "SET_STATUS";
export const SET_SUBREDDIT = "SET_SUBREDDIT";
export const SET_AFTER = "SET_AFTER";
export const SET_SELL_PRICE = "SET_SELL_PRICE";
export const SET_MEMES = "SET_MEMES";
export const CLEAR_MEMES = "CLEAR_MEMES";
export const SET_LOADING = "meme/loading";

// State
const state = {
  status: "",
  statusText: "",
  data: "",
  sellPrice: "",
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
  },
  sellPrice(state) {
    return state.sellPrice;
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
  [SET_SELL_PRICE](state, price) {
    state.sellPrice = price;
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
        after: state.after || null,
        raw_json: 1 // response body encoding @ https://www.reddit.com/dev/api/
      });

      console.log(res, parse(res));

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

      // TODO: Change this so that it initiates the share dialog instead `Meme.Share`
      //       best way to achieve would be to update Notification.vue so that it can
      //       take a callback function
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
      payload.onSuccess();
      commit(SET_LOADING, false);
    } catch (err) {
      handleError(commit, err);
      commit(SET_LOADING, false);
    }
  },
  async [SELL_MEME_PRICE]({ commit }, payload) {
    commit(SET_LOADING, true);
    try {
      const res = await api.get(`/v1/meme/${payload.id}/sell`);
      console.log(res);
      commit(SET_SELL_PRICE, res.data.price);
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

const url = meme => {
  if (
    meme.preview &&
    meme.preview.images.length &&
    meme.preview.images[0].resolutions.length &&
    meme.preview.images[0].resolutions.length >= 3
  ) {
    return meme.preview.images[0].resolutions[2].url;
  } else {
    return meme.url;
  }
};

const parse = json => {
  let memes = [];
  json.data.children.forEach(meme => {
    meme = meme.data;
    if (!meme.is_self) {
      let obj = {
        id: meme.id,
        title: meme.title,
        url: url(meme),
        author: meme.author,
        score: meme.score,
        created: meme.created,
        permalink: meme.permalink,
        subreddit: meme.subreddit,
        thumbnail: meme.thumbnail,
        copied: false
      };
      if (meme.domain == "youtu.be" || meme.domain == "discord.gg") {
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
