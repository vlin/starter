const path = require('path');
const config = require('./config');
const pages = require('./pages');

const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

const happyThreadPool = HappyPack.ThreadPool({ size: 10 });

function createHappyPlugin(id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,

    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  });
}

// 定义 plugin
const plugins = [
  // 全局 jquery
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  }),
  // new WebpackMd5Hash(), // replace a standard webpack chunkhash with md5.
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'js/[name]-[hash:8].js',
    minChunks: 3
  }),
  new CopyWebpackPlugin([
    { from: path.resolve(config.srcDir, 'assets/vendors/respond.min.js'), to: 'js/' }
  ]),

  createHappyPlugin('html', ['dot']),
  createHappyPlugin('css', ['css?minimize&-autoprefixer']),
  createHappyPlugin('image', ['file?name=static/img/[name]-[hash:8].[ext]']),

  createHappyPlugin('font-ttf', ['file?minetype=application/octet-stream&name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-eot', ['file?name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-svg', ['file?minetype=image/svg+xml&name=static/fonts/[name]-[hash:8].[ext]']),
  createHappyPlugin('font-woff', ['file?minetype=application/font-woff&name=static/fonts/[name]-[hash:8].[ext]']),

  new ExtractTextPlugin('css/[name]-[contenthash:8].css') //, {allChunks: true})

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
