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
    loader: 'happypack/loader?id=html'
    // loader: 'dot-loader'
  }, {
    test: /\.css$/,
    include: config.srcDir,
    loader: ExtractTextPlugin.extract('style', 'happypack/loader?id=css')
    // loader: ExtractTextPlugin.extract('style', 'css?minimize&-autoprefixer!postcss')
  }, {
    test: /\.(png|jpg|gif)$/,
    include: config.srcDir,
    //loader: 'happypack/loader?id=image'
     loader: 'file?name=static/img/[name]-[hash:8].[ext]'
  }, {
    test: /\.ttf\??.*$/,
    include: path.resolve(config.srcDir, './assets/vendors/'),
    // loader: 'happypack/loader?id=font-ttf'
    loader: 'file?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/octet-stream'
  }, {
    test: /\.eot\??.*$/,
    include: path.resolve(config.srcDir, './assets/vendors/'),
    // loader: 'happypack/loader?id=font-eot'
    loader: 'file?name=static/fonts/[name]-[hash:8].[ext]'
  }, {
    test: /\.svg\??.*$/,
    include: path.resolve(config.srcDir, './assets/vendors/'),
    // loader: 'happypack/loader?id=font-svg'
    loader: 'file?name=static/fonts/[name]-[hash:8].[ext]&minetype=image/svg+xml'
  }, {
    test: /\.(woff|woff2)\??.*$/,
    include: path.resolve(config.srcDir, './assets/vendors/'),
    // loader: 'happypack/loader?id=font-woff'
    loader: 'file?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/font-woff'
  }]
};

module.exports = modules;
