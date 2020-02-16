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
    'setStateInput': setStateInput,
    'MAIN_PIN_WIDTH': 62,
    'MAIN_PIN_HEIGHT': 62,
    'MAIN_PIN_FOOT_HEIGHT': 22,
    'PIN_WIDTH': 50,
    'PIN_HEIGHT': 70,
    'ENTER_KEY': 'Enter'
  };
})();
