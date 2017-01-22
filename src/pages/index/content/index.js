var coala = require('coala');
var config = require('config');
var tpl = require('./index.html');
require('./index.css');

module.exports = {
  tpl: tpl,
  listen: {
    init: function() {},

    mount: function() {},

    updated: function() {
      console.log('updated');
      //$('#test').attr('src', $('#test').data('src'));
    }
  },
  events: {
    'click button': 'show'
  },
  handle: {
    show: function() {
      require.ensure([], function() {
        require('./my-alert.css');
        var myAlert = require('./my-alert');
        myAlert();
      });
    }
  }

};
