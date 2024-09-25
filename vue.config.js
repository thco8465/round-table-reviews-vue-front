const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  //publicPath: './',  // This sets the base URL to be relative for assets
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*.*'], // Adjust the paths as needed
      options: {
        usePolling: true,    // Enable polling
        interval: 1000,      // Check for changes every second
      },
    },
  },
});
