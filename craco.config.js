const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {

  },
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
      assert: "assert",
      buffer: "buffer",
      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util",
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: {
    add: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
};
