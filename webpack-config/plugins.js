const path = require('path');
const config = require('./config');
const pages = require('./pages');

const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 25 });

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,

    // disable happy caching with HAPPY_CACHE=0
    cache: true,

    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  });
}

/*
new HappyPack({
    id: 'css',
    threads: 4,
    loaders: ['css?minimize&-autoprefixer']
  }),
  new HappyPack({
    id: 'iconfont',
    threads: 2,
    loaders: ['file?name=static/fonts/[name].[ext]']
  }),
*/

// 定义 plugin
const plugins = [
  // 全局 jquery
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'js/[name]-[hash:8].js',
    minChunks: 3
  }),

  /*new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    }
  })*/
  createHappyPlugin('css', ['css?minimize&-autoprefixer']),
  createHappyPlugin('font-ttf', ['file?name=static/fonts/[name].[ext]&minetype=application/octet-stream']),
  createHappyPlugin('font-eot', ['file?name=static/fonts/[name].[ext]']),
  createHappyPlugin('font-svg', ['file?name=static/fonts/[name].[ext]&minetype=image/svg+xml']),
  createHappyPlugin('font-woff', ['file?name=static/fonts/[name].[ext]&minetype=application/font-woff']),
  createHappyPlugin('font-woff2', ['file?name=static/fonts/[name].[ext]&minetype=application/font-woff']),
  new ExtractTextPlugin('css/[name]-[chunkhash:8].css')

];

// 自动生成 html 页面，并注入 css & js
pages.forEach(function(page) {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: page + '.html',
    template: path.resolve(config.srcDir, 'template.html'),
    chunks: [page, 'common'],
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  });
  plugins.push(htmlPlugin);
});

module.exports = plugins;
