// dev server，定义反向代理
const devServer = {
  historyApiFallback: true,
  hot: true,
  inline: true,
  stats: {
    colors: true
  },
  proxy: {
    '/api/*': {
      target: 'https://api.github.com/',
      changeOrigin: true,
      rewrite: function(req) {
        req.url = req.url.replace(/^\/api(.+)$/, '$1');
      }
    }
  }
};

module.exports = devServer;
