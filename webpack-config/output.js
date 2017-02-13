const config = require('./config');

// 定义输出目录
const output = {
  path: config.distDir, // 生成文件的存放路径
  publicPath: '/', // 发布后的页面路径
  filename: 'js/[name]-[chunkhash:8].js', //各页面模块对应的主要 js 文件命名
  chunkFilename: 'js/[name]-[id]-[chunkhash:8].js' // 分块后异步请求的 js 文件存放路径及命名
};

module.exports = output;
