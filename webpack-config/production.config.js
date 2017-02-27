const webpack = require('webpack');
var plugins = require('./plugins');

// plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false,
//       drop_console: true
//     }
//   })
// );

module.exports = {
  entry: require('./entry'),
  output: require('./output'),
  plugins: plugins,
  module: require('./modules'),
  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  },
  // 打包文件的尺寸超出指定限制时进行提示。可通过 maxEntrypointSize/maxAssetSize 等参数根据实际项目环境进行配置
  performance: {
    hints: 'warning'
  }
};
