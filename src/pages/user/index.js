var common = require('common');
var coala = require('coala');

var content = require('./content');
var topNav = require('components/topNav');

var tpl = require('./index.html');

coala.mount($.extend(true, common, {
  tpl: tpl,
  refs: {
    topNav: {
      component: topNav,
      el: '#topNav'
    },
    content: {
      component: content,
      el: '#pageWrapper'
    }
  }
}), '#app');
