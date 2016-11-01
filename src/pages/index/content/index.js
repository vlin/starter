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
    },

    render: function(data) {
    },

    updated: function() {
      console.log('updated');
    }
  }
};
