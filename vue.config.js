const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

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
  configureWebpack: {
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url/'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',  // Provide a browser-compatible version of process
        Buffer: ['buffer', 'Buffer']   // Provide Buffer polyfill
      })
    ]
  }
});
