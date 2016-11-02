const webpack = require('webpack');
var plugins = require('./webpack-config/plugins');

plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    }
  })
);

module.exports = {
  entry: require('./webpack-config/entry'),
  output: require('./webpack-config/output'),
  plugins: plugins,
  module: require('./webpack-config/modules'),
  resolve: {
    modulesDirectories: ['node_modules', 'src', 'src/pages', 'src/assets']
  },
  postcss: require('./webpack-config/postcss')
};
