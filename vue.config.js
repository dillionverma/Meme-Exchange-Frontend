module.exports = {
  devServer: {
    port: 8081,
    https: true,
    proxy: {
      "/reddit": {
        target: "https://www.reddit.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/reddit": ""
        }
      }
    }
  }
};
