'use strict';

(function () {
  var AD_AUTHOR_AVATARS = ['01', '05', '08', '07', '02', '03', '06', '04'];
  var AD_OFFER_TITLES = ['Бронируйте', 'Только у нас', 'Дешево', 'Лучшее', 'Топ', 'Круто', 'The best', 'Срочно'];
  var AD_OFFER_ADDRESSES = ['100, 200', '500, 300', '150, 400', '400, 250', '100, 70', '360, 300', '420, 400', '190, 280', '330, 370'];
  var MIN_OFFER_PRICE = 200;
  var MAX_OFFER_PRICE = 2000;
  var AD_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_OFFER_ROOMS = 1;
  var MAX_OFFER_ROOMS = 5;
  var MIN_OFFER_GUESTS = 1;
  var MAX_OFFER_GUESTS = 6;
  var AD_OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var AD_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AD_OFFER_DESCRIPTION = 'Описание жилья';
  var AD_OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_LOCATION_X = 0;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var map = document.querySelector('.map');

  var getRandomValue = function (from, to) {
    return Math.round(Math.random() * to) + from;
  };

  var getRandomElement = function (array) {
    var i = getRandomValue(0, array.length - 1);
    return array[i];
  };

  var makeAd = function name(i) {
    return {
      'autor': {
        'avatar': 'img/avatars/user' + AD_AUTHOR_AVATARS[i] + '.png'
      },
      'offer': {
        'title': AD_OFFER_TITLES[i],
        'address': AD_OFFER_ADDRESSES[i],
        'price': getRandomValue(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
        'type': getRandomElement(AD_OFFER_TYPES),
        'rooms': getRandomValue(MIN_OFFER_ROOMS, MAX_OFFER_ROOMS),
        'guests': getRandomValue(MIN_OFFER_GUESTS, MAX_OFFER_GUESTS),
        'checkin': getRandomElement(AD_OFFER_TIMES),
        'checkout': getRandomElement(AD_OFFER_TIMES),
        'features': getRandomElement(AD_OFFER_FEATURES),
        'description': AD_OFFER_DESCRIPTION,
        'photos': getRandomElement(AD_OFFER_PHOTOS)
      },
      'location': {
        'x': getRandomValue(MIN_LOCATION_X, map.clientWidth),
        'y': getRandomValue(MIN_LOCATION_Y, MAX_LOCATION_Y)
      }
    };
  };

  var getAds = function () {
    var array = [];
    for (var i = 0; i < 8; i++) {
      array[i] = makeAd(i);
    }
    return array;
  };

  window.data = {
    'getAds': getAds
  };
})();
