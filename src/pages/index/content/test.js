var tpl = require('./test.html');

module.exports = function() {
  $.get('/api/users', function(res) {
    $('#list').html(tpl(res));
  });
};
