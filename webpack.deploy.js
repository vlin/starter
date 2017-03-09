const config = require('./webpack.config');
const SshWebpackPlugin = require('ssh-webpack-plugin');

config.plugins.push(
    new SshWebpackPlugin({
      host: '192.168.0.246',
      port: '22',
      username: 'root',
      password: 'qfang.com',
      from: './dist',
      cover: false,
      to: '/data/www/starter'
    })
  );
module.exports = config;

