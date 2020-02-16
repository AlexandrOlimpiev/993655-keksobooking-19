'use strict';

(function () {
  var setStateInput = function (form, state) {
    var inputList = form.querySelectorAll('input');
    var selectList = form.querySelectorAll('select');

    for (var i = 0; i < inputList.length; i++) {
      if (state === 'disable') {
        inputList[i].setAttribute('disabled', 'disabled');
      }
      if (state === 'enable') {
        inputList[i].removeAttribute('disabled');
      }
    }
    for (var j = 0; j < inputList.length; j++) {
      if (state === 'disable') {
        selectList[j].setAttribute('disabled', 'disabled');
      }
      if (state === 'enable') {
        selectList[j].removeAttribute('disabled');
      }
    }
  };

  window.util = {
    'setStateInput': setStateInput
  };
})();
