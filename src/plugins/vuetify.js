import Vue from "vue";
import Vuetify from "vuetify/lib";

// import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; // needed for social media icons
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue,
        secondary: colors.yellow,
        accent: colors.red
        // error: colors.red.accent3
      },
      dark: {
        primary: colors.black,
        secondary: colors.indigo,
        accent: colors.red
      }
    }
  }
});
