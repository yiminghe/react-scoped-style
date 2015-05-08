'use strict';

module.exports = {
  entry: {index:'./index.js'},
  output: {
    filename: "[name].js",
    path: __dirname + "/build"
  },
  resolve: {
    alias: {
      'react-scoped-style$': require.resolve('../index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'jsx-loader?harmony'
        ]
      }
    ]
  }
};
