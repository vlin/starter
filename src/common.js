var config = require('config');
var coala = require('coala');
var invalidSession = false;

require('vendors/qui/css/bootstrap.min.css');
require('vendors/iconfont/iconfont.css');
require('vendors/qui/js/bootstrap.min');

// setup the default parameter for all of the ajax requests
$.ajaxSetup({
  cache: false,
  xhrFields: {
    withCredentials: true
  }
});

// whenever an ajax request completes with an error, check the xhr status;
$(document).off('ajaxError').on('ajaxError', function(res, xhr) {
  if (xhr.status == 0) {
    return;
  } else if (xhr.status == 401 && !invalidSession) {
    invalidSession = !0;
    location.href = JSON.parse(xhr.responseText).result;
  }
});

// abort the all the ajax requests when the session is expired.
$.ajaxPrefilter(function(options, originalOptions, xhr) {
  if (invalidSession) {
    xhr.abort();
  } else if (options.robot) {
    xhr.setRequestHeader('X-Robot', true);
  } else if (options.loading) {
    //options.layerId = layer.msg('加载中...', {icon: 16});
  }
});

$(document).off('ajaxComplete').on('ajaxComplete', function(e, req, options) {
  if (options.loading) {
    //layer.close(options.layerId);
  }
});
