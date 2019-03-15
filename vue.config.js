const manifest = require("./public/manifest");

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  integrity: true,
  devServer: {
    port: 8081,
    hot: true,
    open: true,
    overlay: true
  },
  pwa: {
    name: manifest.name,
    themeColor: manifest.theme_color,
    msTileColor: manifest.background_color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
