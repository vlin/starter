module.exports = function() {
  alert('Asynchronous message from custom alert. \nApply new style and new image');
  $('#test')[0].src = $('#test').data('src');
};
