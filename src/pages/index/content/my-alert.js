require('./my-alert.css');

module.exports = function () {
  alert('Asynchronous message from custom alert.\nNew style and new image applied.');
  $('#test')[0].src = $('#test').data('src');
};
