module.exports = {
  /* timestamp: it can be a real timestamp, or a value of Date type;
   *  fmt: 'yyyy-MM-dd hh:mm:ss' or 'MM-dd' or ...
   *  humanized: check the date is today or not
   */
  dateFormat: function(timestamp, fmt, humanized) {
    if (timestamp instanceof Date) {
      timestamp = timestamp.getTime();
    }

    if (timestamp != null) {
      var localTime = new Date(timestamp + (new Date(timestamp).getTimezoneOffset() - -480) * 60 * 1000);
      // get the date from client side, but it may not be the same as the date from server side

      var today = new Date();
      if (humanized) {
        if (new Date(localTime.getFullYear() + '/' + (localTime.getMonth() + 1) + '/' + localTime.getDate()).getTime() == new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()).getTime()) {
          fmt = fmt.replace(/(y+-)?M+-d+/, '今日');
        }
      }

      var o = {
        'M+': localTime.getMonth() + 1,
        'd+': localTime.getDate(),
        'h+': localTime.getHours(),
        'm+': localTime.getMinutes(),
        's+': localTime.getSeconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (localTime.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }

      return fmt;
    } else {
      return '';
    }

  },

  urlParse: function(url) {
    var pattern = /(\w+)=(\w+)/ig;
    var params = {};
    url.replace(pattern, function(a, b, c) {
      params[b] = c;
    });

    return params;
  }
};
