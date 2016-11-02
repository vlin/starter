const path = require('path');
const config = require('./config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 定义所需的 loader
const modules = {
  // noParse: [
  //   config.srcDir + '/assets/vendor/qui/js/bootstrap.min',
  //   'node_modules/jquery/dist/jquery.min',
  //   config.srcDir + '/assets/vendors/qui/css/bootstrap.min.css'
  // ],
  loaders: [{
    test: require.resolve('jquery'),
    loader: 'expose?$!expose?jQuery'
  }, {
    test: /\.html$/,
    include: config.srcDir,
    loader: 'dot-loader'
  }, {
    test: /\.css$/,
    include: config.srcDir,
    loader: ExtractTextPlugin.extract('happypack/loader?id=css')

    // loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss')
  }, {
    test: /\.(png|jpg|gif)$/,
    include: config.srcDir,
    loader: 'file?name=static/img/[name].[ext]'
  }, {
    // iconfont
    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
    include: config.srcDir + '/assets/vendors/',
    loaders: ['happypack/loader?id=iconfont']

    // loader: 'file?name=static/fonts/[name].[ext]'
  }]
};

module.exports = modules;
