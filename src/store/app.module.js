import Vuetify from "@/plugins/vuetify";
// import api from "@/lib/api.service";

// Actions
// export const LEADERBOARD = "LEADERBOARD";

// Mutations
// export const SET_LOADING = "leaderboard/loading";
export const HOME = "app/HOME";
export const LOGIN_DIALOG = "app/LOGIN_DIALOG";
export const USERNAME_DIALOG = "app/USERNAME_DIALOG";
export const SHARE_DIALOG = "app/SHARE_DIALOG";
export const SHARE_MEME = "app/SHARE_MEME"; // Used to populate data for share dialog to use

export const MENU = "app/MENU";
export const DRAWER = "app/DRAWER";
export const DARK = "app/DARK";

let dark = localStorage.getItem("dark") === "true";

// State
const state = {
  title: "Meme Exchange",
  loginDialog: false,
  usernameDialog: false,
  shareDialog: false,
  shareMeme: {},
  drawer: null,
  menu: false,
  dark: dark,
  appbarColor: dark ? "dark" : "primary",
  // items: [
  //   { icon: "dashboard", text: "Dashboard", path: "/" },
  //   { icon: "search", text: "Explore", path: "/r/memes" },
  //   { icon: "list", text: "Leaderboard", path: "/leaderboard" },
  //   { icon: "exit_to_app", text: "Login", path: "/login" },
  //   { icon: "person_add", text: "Sign Up", path: "/signup" }
  // ],
  extraItems: [
    { icon: "settings", text: "Settings", path: "/settings" },
    { icon: "chat_bubble", text: "Send feedback", path: "/feedback" },
    { icon: "help", text: "Help", path: "/help" }
  ],
  subreddits: {
    memes: {
      text: "memes",
      path: "/r/memes",
      id: "t5_2qjpg",
      icon: "",
      color: ""
    },
    dankmemes: {
      text: "dankmemes",
      path: "/r/dankmemes",
      id: "t5_2zmfe",
      icon: "",
      color: ""
    },
    MemeEconomy: {
      text: "MemeEconomy",
      path: "/r/MemeEconomy",
      id: "t5_3gl3k",
      icon: "",
      color: ""
    },
    BlackPeopleTwitter: {
      text: "BlackPeopleTwitter",
      path: "/r/BlackPeopleTwitter",
      id: "t5_33x33",
      icon: "",
      color: ""
    },
    wholesomememes: {
      text: "wholesomememes",
      path: "/r/wholesomememes",
      id: "t5_3gcwj",
      icon: "",
      color: ""
    },
    me_irl: {
      text: "me_irl",
      path: "/r/me_irl",
      id: "t5_2vegg",
      icon: "",
      color: ""
    },
    surrealmemes: {
      text: "surrealmemes",
      path: "/r/surrealmemes",
      id: "t5_3bz2s",
      icon: "",
      color: ""
    },
    DeepFriedMemes: {
      text: "DeepFriedMemes",
      path: "/r/DeepFriedMemes",
      id: "t5_3a7zb",
      icon: "",
      color: ""
    },
    nukedmemes: {
      text: "nukedmemes",
      path: "/r/nukedmemes",
      id: "t5_3iiap",
      icon: "",
      color: ""
    },
    // ImGoingToHellForThis: {
    //   text: "ImGoingToHellForThis",
    //   path: "/r/ImGoingToHellForThis",
    //   id: "t5_2s7yq",
    //   icon: "",
    //   color: ""
    // },
    AdviceAnimals: {
      text: "AdviceAnimals",
      path: "/r/AdviceAnimals",
      id: "t5_2s7tt",
      icon: "",
      color: ""
    },
    ComedyCemetery: {
      text: "ComedyCemetery",
      path: "/r/ComedyCemetery",
      id: "t5_2zzho",
      icon: "",
      color: ""
    },
    PrequelMemes: {
      text: "PrequelMemes",
      path: "/r/PrequelMemes",
      id: "t5_3i60n",
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
  shareDialog(state) {
    return state.shareDialog;
  },
  shareMeme(state) {
    return state.shareMeme;
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
  [SHARE_DIALOG](state, shareDialog) {
    state.shareDialog = shareDialog;
  },
  [SHARE_MEME](state, meme) {
    state.shareMeme = meme;
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
    Vuetify.framework.theme.dark = !Vuetify.framework.theme.dark;

    localStorage.setItem("dark", state.dark);
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
