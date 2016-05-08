var webpack = require('webpack');

var config = {
  context: __dirname,
  entry: "./src/app.js",
  output: {
      path: __dirname + '/output',
      filename: "bundle.js"
  },
  module: {
      loaders: [
         { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
  },
  devServer: {
    publicPath: '/output/'
  },
  devtool: 'source-map',
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;