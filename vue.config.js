module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  integrity: true,
  devServer: {
    port: 8081,
    https: true,
    hot: true,
    open: true,
    overlay: true
  }
  // chainWebpack: config => {
  // config.plugins.delete("prefetch");
  // config.plugin("preload").tap(args => {
  //   args[0].include = "asyncChunks";
  //   console.log(args);
  //   return args;
  // });
  // plugins: [
  //     new CompressionWebpackPlugin({
  //       filename: "[path].gz[query]",
  //       algorithm: "gzip",
  //       test: /\.(js|css|html|svg|ttf|eot|woff|woff2|png)$/,
  //       threshold: 0,
  //       minRatio: 1
  //     })
  // ]
  //}
  // }
};
