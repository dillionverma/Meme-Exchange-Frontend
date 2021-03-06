// Notification payload sample
//
// {
//   message: "Successfully purchased!",
//   link: "/meme/1234/"
//   linkText: "view"
// }

// Actions

// Mutations
export const SUCCESS = "SUCCESS_NOTIFICATION";
export const INFO = "INFO_NOTIFICATION";
export const ERROR = "ERROR_NOTIFICATION";
export const CLEAR = "CLEAR_NOTIFICATION";

// State
const state = {
  message: "",
  status: "", // one of [success, info, error], responsible for Snackbar color
  link: "", // route to go to
  linkText: "" // route to go to
};

// Getters
const getters = {
  message(state) {
    return state.message;
  },
  status(state) {
    return state.status;
  },
  link(state) {
    return state.link;
  },
  linkText(state) {
    return state.linkText;
  }
};

// Mutations
const mutations = {
  [SUCCESS](state, payload) {
    state.message = payload.message;
    state.link = payload.link;
    state.linkText = payload.linkText;
    state.status = "success";
  },
  [INFO](state, payload) {
    state.message = payload.message;
    state.link = payload.link;
    state.linkText = payload.linkText;
    state.status = "info";
  },
  [ERROR](state, payload) {
    state.message = payload.message;
    state.link = payload.link;
    state.linkText = payload.linkText;

    state.status = "error";
  },
  [CLEAR](state) {
    state.message = "";
    state.link = "";
    state.linkText = "close";
    state.status = "";
  }
};

// Actions
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
