'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var createPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
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

  var activationMap = function () {
    map.classList.remove('map--faded');
    pinList.appendChild(renderPins(window.data.getAds()));
    window.util.setStateInput(document.querySelector('.map__filters', 'enable'));
  };

  window.util.setStateInput(document.querySelector('.map__filters', 'disable'));

  window.map = {
    'activationMap': activationMap
  };
})();
