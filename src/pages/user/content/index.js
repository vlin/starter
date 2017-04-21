var tpl = require('./index.html');
require('./index.css');

module.exports = {
  tpl: tpl,
  listen: {
    mount: function () {
      var _this = this;
      $.get('/api/users', function (res) {
        _this.data = res;
        _this.update();
      });

    }
  }
};
