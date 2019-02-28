// import api from "@/lib/api.service";

// Actions
// export const LEADERBOARD = "LEADERBOARD";

// Mutations
// export const SET_LOADING = "leaderboard/loading";
export const HOME = "app/HOME";
export const DIALOG = "app/DIALOG";
export const MENU = "app/MENU";
export const DRAWER = "app/DRAWER";

// State
const state = {
  title: "Meme Exchange",
  dialog: false,
  drawer: false,
  menu: false,
  appbarColor: "primary",
  items: [
    { icon: "home", text: "Home", path: "/" },
    { icon: "search", text: "Explore", path: "/r/memes" },
    { icon: "list", text: "Leaderboard", path: "/leaderboard" },
    { icon: "exit_to_app", text: "Login", path: "/login" },
    { icon: "person_add", text: "Sign Up", path: "/signup" }
  ],
  extraItems: [
    { icon: "settings", text: "Settings", path: "/settings" },
    { icon: "chat_bubble", text: "Send feedback", path: "/feedback" },
    { icon: "help", text: "Help", path: "/help" }
  ],
  subreddits: {
    memes: {
      text: "memes",
      path: "/r/memes",
      icon: "",
      color: ""
    },
    dankmemes: {
      text: "dankmemes",
      path: "/r/dankmemes",
      icon: "",
      color: ""
    },
    memeeconomy: {
      text: "memeeconomy",
      path: "/r/memeeconomy",
      icon: "",
      color: ""
    },
    blackpeopletwitter: {
      text: "blackpeopletwitter",
      path: "/r/blackpeopletwitter",
      icon: "",
      color: ""
    },
    wholesomememes: {
      text: "wholesomememes",
      path: "/r/wholesomememes",
      icon: "",
      color: ""
    },
    Me_irl: {
      text: "Me_irl",
      path: "/r/Me_irl",
      icon: "",
      color: ""
    },
    surrealmemes: {
      text: "surrealmemes",
      path: "/r/surrealmemes",
      icon: "",
      color: ""
    },
    deepfriedmemes: {
      text: "deepfriedmemes",
      path: "/r/deepfriedmemes",
      icon: "",
      color: ""
    },
    imgoingtohellforthis: {
      text: "imgoingtohellforthis",
      path: "/r/imgoingtohellforthis",
      icon: "",
      color: ""
    }
  },
  footer: [
    { text: "About", path: "/about" },
    { text: "Press", path: "/press" },
    { text: "Copyright", path: "/copyright" },
    { text: "Contact Us", path: "/contact-us" },
    { text: "Terms", path: "/terms" },
    { text: "Privacy Policy", path: "/privacy-policy" }
  ]
};

// Getters
const getters = {
  title(state) {
    return state.title;
  },
  dialog(state) {
    return state.dialog;
  },
  drawer(state) {
    return state.drawer;
  },
  menu(state) {
    return state.menu;
  },
  appbarColor(state) {
    return state.appbarColor;
  },
  items(state) {
    return state.items;
  },
  extraItems(state) {
    return state.extraItems;
  },
  subreddits(state) {
    return state.subreddits;
  },
  footer(state) {
    return state.footer;
  }
};

// Mutations
const mutations = {
  [HOME](state) {
    state.dialog = false;
    state.drawer = false;
    state.menu = false;
  },
  [DIALOG](state, dialog) {
    state.dialog = dialog;
  },
  [MENU](state, menu) {
    state.menu = menu;
  },
  [DRAWER](state, drawer) {
    if (!drawer) {
      state.drawer = !state.drawer; // if no arg passed, toggle drawer
    } else {
      state.drawer = drawer;
    }
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
