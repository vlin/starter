var loaderUtils = require('loader-utils');
var dot = require('dot');
var fs = require('fs');
var path = require('path');

function unique(array) {
  var seen = new Set;
  return array.filter(function(item) {
    if (!seen.has(item.path)) {
      seen.add(item.path);
      return true;
    }
  });
}

function replaceAll(find, replace, str) {
  var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  return str.replace(new RegExp(find, 'g'), replace);
}

function parseUrl(context, content) {
  // 匹配所有图片路径，包括 <img src=""> data-xxx="" 等
  var re = /(\"|\'){1}([^("|')]*\.(png|jpg|gif)\??.*?)(\"|\'){1}/g;
  var resources = [];
  while (arr = re.exec(content)) {
    var url = arr[2];
    if (url.substr(0, 4) != 'http') {
      var fullPath = path.join(context, url).replace(/\\/g, '\\\\');

      try {
        fs.statSync(fullPath);
        resources.push({ path: url, Path: fullPath });
      } catch (err) {
        throw new Error('[' + fullPath + ']: it does not exist.');
      }
    }
  }

  return resources;
}

module.exports = function(content) {

  if (this.cacheable) {
    this.cacheable();
  }

  dot.templateSettings.selfcontained = true;
  var resources = unique(parseUrl(this.context, content));

  var dot1 = dot.template(content) + '';
  for (var i = resources.length - 1; i >= 0; i--) {
    dot1 = replaceAll(resources[i].path, '\'+require(\"' + resources[i].Path + '\")+\'', dot1);
  }

  return 'module.exports = ' + dot1;
};
