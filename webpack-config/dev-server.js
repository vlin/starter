// dev server，定义反向代理
const devServer = {
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 8080,
  compress: true,
  stats: {
    colors: true
  },
  headers: { 'X-My-Header': '^_^' }, //自定义返回头
  proxy: {
    '/api/*': {
      target: 'https://api.github.com/',
      changeOrigin: true,
      pathRewrite: { // 根据实际情况配置是否需要重写 url
        '^/api': ''
      }
    }
  }
};

module.exports = devServer;
