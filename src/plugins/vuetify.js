import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
// import 'vuetify/src/stylus/app.styl'
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "fa",
  theme: {
    primary: colors.red,
    secondary: colors.indigo,
    accent: colors.red
  }
});
