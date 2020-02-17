'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var createPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - window.util.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - window.util.PIN_HEIGHT + 'px';
    var pinElementImage = pinElement.querySelector('img');
    pinElementImage.src = pin.autor.avatar;
    pinElementImage.alt = pin.offer.title;
    return pinElement;
  };

  var renderPins = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 8; i++) {
      fragment.appendChild(createPin(arrayPins[i]));
    }
    return fragment;
  };

  var getMainPinLocationX = function () {
    return mainPin.offsetLeft + window.util.MAIN_PIN_WIDTH / 2;
  };

  var getMainPinLocationY = function () {
    if (map.classList.contains('map--faded')) {
      return mainPin.offsetTop + window.util.MAIN_PIN_HEIGHT / 2;
    } else {
      return mainPin.offsetTop + window.util.MAIN_PIN_HEIGHT + window.util.MAIN_PIN_FOOT_HEIGHT;
    }
  };

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
    if (evt.key === window.util.ENTER_KEY) {
      window.map.activationMap();
      window.form.activationForm();
      mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
      mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    }
  };

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

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  window.pin = {
    'getMainPinLocationX': getMainPinLocationX,
    'getMainPinLocationY': getMainPinLocationY,
    'renderPins': renderPins
  };
})();
