'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_FOOT_HEIGHT = 22;
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');


  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();
    if (!evt.button) {
      window.map.activationMap();
      window.form.activationForm();
      mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
      mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    }
  };

  var mainPinKeydownHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === ENTER_KEY) {
      window.map.activationMap();
      window.form.activationForm();
      mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
      mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    getMainPinLocationX: function () {
      return mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    },

    getMainPinLocationY: function () {
      if (map.classList.contains('map--faded')) {
        return mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
      } else {
        return mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_FOOT_HEIGHT;
      }
    }
  };
})();
