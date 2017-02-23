module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: require('./dev-server'),
  entry: require('./entry'),
  output: require('./output'),
  plugins: require('./plugins'),
  module: require('./modules'),
  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  }
};
