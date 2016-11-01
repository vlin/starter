var webpack = require('webpack');
module.exports = {
  entry: require('./webpack-config/entry'),
  output: require('./webpack-config/output'),
  plugins: require('./webpack-config/plugins').push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ),
  module: require('./webpack-config/modules'),
  resolve: {
    modulesDirectories: ['node_modules', 'src', 'src/pages', 'src/assets']
  },
  postcss: require('./webpack-config/postcss')
};
