// import api from "@/lib/api.service";

// Actions
// export const LEADERBOARD = "LEADERBOARD";

// Mutations
// export const SET_LOADING = "leaderboard/loading";
export const HOME = "app/HOME";
export const LOGIN_DIALOG = "app/LOGIN_DIALOG";
export const USERNAME_DIALOG = "app/USERNAME_DIALOG";

export const MENU = "app/MENU";
export const DRAWER = "app/DRAWER";
export const DARK = "app/DARK";

// State
const state = {
  title: "Meme Exchange",
  loginDialog: false,
  usernameDialog: false,
  drawer: null,
  menu: false,
  dark: false,
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
    nukedmemes: {
      text: "nukedmemes",
      path: "/r/nukedmemes",
      icon: "",
      color: ""
    },
    imgoingtohellforthis: {
      text: "imgoingtohellforthis",
      path: "/r/imgoingtohellforthis",
      icon: "",
      color: ""
    },
    AdviceAnimals: {
      text: "AdviceAnimals",
      path: "/r/AdviceAnimals",
      icon: "",
      color: ""
    },
    ComedyCemetery: {
      text: "ComedyCemetery",
      path: "/r/ComedyCemetery",
      icon: "",
      color: ""
    },
    PrequelMemes: {
      text: "PrequelMemes",
      path: "/r/PrequelMemes",
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
  loginDialog(state) {
    return state.loginDialog;
  },
  usernameDialog(state) {
    return state.usernameDialog;
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
  },
  dark(state) {
    return state.dark;
  }
};

// Mutations
const mutations = {
  [HOME](state) {
    state.loginDialog = false;
    state.drawer = false;
    state.menu = false;
  },
  [LOGIN_DIALOG](state, loginDialog) {
    state.loginDialog = loginDialog;
  },
  [USERNAME_DIALOG](state, usernameDialog) {
    state.usernameDialog = usernameDialog;
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
  },
  [DARK](state) {
    state.dark = !state.dark;
    if (state.dark) {
      state.appbarColor = "grey darken-4";
    } else {
      state.appbarColor = "primary";
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
