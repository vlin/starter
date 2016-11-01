var coala = require('coala');
var config = require('config');
var tpl = require('./index.html');
require('./index.css');
module.exports = {
  tpl: tpl,
  listen: {
    init: function() {
    },

    mount: function() {
      console.log('mount');
    },

    render: function(data) {
      console.log('render');
    },

    updated: function() {
      console.log('updated');
    }
  }
};
