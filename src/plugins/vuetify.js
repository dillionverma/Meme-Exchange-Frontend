import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
// import 'vuetify/src/stylus/app.styl'
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: "md"
});
