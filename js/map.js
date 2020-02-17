'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');

  var activationMap = function () {
    map.classList.remove('map--faded');
    pinList.appendChild(window.pin.renderPins(window.data.getAds()));
    window.util.setStateInput(document.querySelector('.map__filters', 'enable'));
  };

  window.util.setStateInput(document.querySelector('.map__filters', 'disable'));

  window.map = {
    'activationMap': activationMap
  };
})();
