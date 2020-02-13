'use strict';

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_FOOT_HEIGHT = 22;
var ENTER_KEY = 'Enter';
var ads = [];
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');

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

ads = getAds();
pinList.appendChild(renderPins(ads));

var disableInput = function (form) {
  var inputList = form.querySelectorAll('input');
  var selectList = form.querySelectorAll('select');

  for (var i = 0; i < inputList.length; i++) {
    inputList[i].setAttribute('disabled', 'disabled');
  }

  for (var j = 0; j < selectList.length; j++) {
    selectList[j].setAttribute('disabled', 'disabled');
  }
};

var enableInput = function (form) {
  var inputList = form.querySelectorAll('input');
  var selectList = form.querySelectorAll('select');
  for (var i = 0; i < inputList.length; i++) {
    inputList[i].removeAttribute('disabled');
  }

  for (var j = 0; j < selectList.length; j++) {
    selectList[j].removeAttribute('disabled');
  }
};

disableInput(document.querySelector('.map__filters'));
disableInput(document.querySelector('.ad-form'));


var activationPage = function () {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  enableInput(document.querySelector('.map__filters'));
  enableInput(document.querySelector('.ad-form'));
  setInputAdress();
};

var mainPin = pinList.querySelector('.map__pin--main');

mainPin.addEventListener('mousedown', function (evt) {
  if (!evt.button) {
    activationPage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activationPage();
  }
});

var getMainPinLocationX = function () {
  return mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
};

var getMainPinLocationY = function () {
  if (map.classList.contains('map--faded')) {
    return mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
  } else {
    return mainPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_FOOT_HEIGHT;
  }
};

var setInputAdress = function () {
  document.querySelector('#address').value = getMainPinLocationX() + ', ' + getMainPinLocationY();
};

setInputAdress();

var fieldNumberRoom = document.querySelector('#room_number');
var fieldNumberGuests = document.querySelector('#capacity');

var validationFieldNumberGuests = function (evt) {
  var NumberRoom = fieldNumberRoom.value;
  var NumberGuests = evt.target.value;
  if (NumberRoom === '1' && (!(NumberGuests === '1'))) {
    fieldNumberGuests.setCustomValidity('В одной комнате можно поселить только одного гостя');
  } else if (NumberRoom === '2' && (!((NumberGuests === '1') || (NumberGuests === '2')))) {
    fieldNumberGuests.setCustomValidity('В двух комнатах можно поселить 1 или 2 гостей');
  } else if (NumberRoom === '3' && (!((NumberGuests === '1') || (NumberGuests === '2') || (NumberGuests === '3')))) {
    fieldNumberGuests.setCustomValidity('В трёх комнатах можно поселить 1, 2 или 3 гостей');
  } else if (NumberRoom === '100' && !(NumberGuests === '0')) {
    fieldNumberGuests.setCustomValidity('В 100 комнатах можно заблудиться');
  } else {
    fieldNumberGuests.setCustomValidity('');
  }
};

var buttonFormSubmit = document.querySelector('.ad-form__submit');
buttonFormSubmit.addEventListener('click', validationFieldNumberGuests);
