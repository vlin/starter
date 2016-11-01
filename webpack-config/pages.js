const glob = require('glob');
const config = require('./config');

// 遍历所有入口文件
const pages = new glob.Glob('!(_)*', {
  cwd: config.srcDir + '/pages',
  sync: true
}).found;

module.exports = pages;
