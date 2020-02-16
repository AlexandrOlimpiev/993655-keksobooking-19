'use strict';

(function () {
  var fieldNumberRoom = document.querySelector('#room_number');
  var fieldNumberGuests = document.querySelector('#capacity');

  var setInputAdress = function () {
    document.querySelector('#address').value = window.pin.getMainPinLocationX() + ', ' + window.pin.getMainPinLocationY();
  };

  var activationForm = function () {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('#address').setAttribute('readonly', 'readonly');
    window.util.setStateInput(document.querySelector('.ad-form', 'enable'));
    setInputAdress();
  };

  var validationFieldNumberGuests = function () {
    var numberRoom = fieldNumberRoom.value;
    var numberGuests = fieldNumberGuests.value;
    if (numberRoom === '1' && (!(numberGuests === '1'))) {
      fieldNumberGuests.setCustomValidity('В одной комнате можно поселить только одного гостя');
    } else if (numberRoom === '2' && (!((numberGuests === '1') || (numberGuests === '2')))) {
      fieldNumberGuests.setCustomValidity('В двух комнатах можно поселить 1 или 2 гостей');
    } else if (numberRoom === '3' && (!((numberGuests === '1') || (numberGuests === '2') || (numberGuests === '3')))) {
      fieldNumberGuests.setCustomValidity('В трёх комнатах можно поселить 1, 2 или 3 гостей');
    } else if (numberRoom === '100' && !(numberGuests === '0')) {
      fieldNumberGuests.setCustomValidity('В 100 комнатах можно заблудиться');
    } else {
      fieldNumberGuests.setCustomValidity('');
    }
  };

  var buttonFormSubmit = document.querySelector('.ad-form__submit');
  buttonFormSubmit.addEventListener('click', function () {
    validationFieldNumberGuests();
  });

  setInputAdress();
  document.querySelector('.map__pin--main').addEventListener('mouseup', setInputAdress);
  window.util.setStateInput(document.querySelector('.ad-form', 'disable'));

  window.form = {
    'activationForm': activationForm
  };
})();
