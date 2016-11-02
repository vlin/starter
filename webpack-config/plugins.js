const path = require('path');
const config = require('./config');
const pages = require('./pages');

const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const DashboardPlugin = require('webpack-dashboard/plugin');

// 定义 plugin
const plugins = [
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

  // new DashboardPlugin(),
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
