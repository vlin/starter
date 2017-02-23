const webpack = require('webpack');
var plugins = require('./plugins');

const SshWebpackPlugin = require('ssh-webpack-plugin');

// plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false,
//       drop_console: true
//     }
//   })
// );

if (process.argv.indexOf('--deploy') > -1) {
  plugins.push(
    new SshWebpackPlugin({
      host: '192.168.0.41',
      port: '22',
      username: 'root',
      password: 'qfang.com',
      from: './dist',
      cover: false,
      to: '/data/www/starter'
    })
  );
}

module.exports = {
  entry: require('./entry'),
  output: require('./output'),
  plugins: plugins,
  module: require('./modules'),
  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  }
};
