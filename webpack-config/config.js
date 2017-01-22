const path = require('path');
const config = {
  srcDir: path.resolve(__dirname, '../src'), //定义源代码路径
  distDir: path.resolve(__dirname, '../dist') //定义打包生成文件路径
};

module.exports = config;
