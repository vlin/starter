const path = require('path');
const config = require('./config');
var pages = require('./pages');
var entry = {};

// 遍历所有入口文件
pages.forEach(function(page) {
  entry[page] = path.resolve(config.srcDir + '/pages', page + '/index.js');
});

module.exports = entry;
