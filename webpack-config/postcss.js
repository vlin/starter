module.exports = function() {
  return [require('precss'), require('autoprefixer')({
    remove: false,
    browsers: ['ie >= 8', '> 1% in CN']
  })];
};
