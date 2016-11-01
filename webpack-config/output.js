const config = require('./config');

// 定义输出目录
const output = {
  path: config.distDir,
  publicPath: '/',
  filename: 'js/[name]-[chunkhash:8].js',
  chunkFilename: '[id].bundle.js'
};

module.exports = output;
