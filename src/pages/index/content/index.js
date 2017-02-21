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
    }
  },
  events: {
    'click button': 'show'
  },
  handle: {
    show: function() {
      require.ensure([], function() {
        var name = ~~(Math.random() * 10) % 2 ? 'my-aler' : 'tes';
//        var myAlert = require('./' + name); //require('./my-alert');
        var myAlert = require(`./${name}t`);
        myAlert();

      });
    }
  }
};
