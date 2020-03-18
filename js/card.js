'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var creatMessageCapacity = function (card) {
    var ending1 = 'ы';
    var ending2 = 'ей';
    if (card.offer.rooms === 1) {
      ending1 = 'а';
    }
    if (card.offer.guests === 1) {
      ending2 = 'я';
    }
    return card.offer.rooms + ' комнат' + ending1 + ' для ' + card.offer.guests + ' гост' + ending2;
  };

  var creatBlockFeatures = function (offerFeatures, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');

    if (offerFeatures.length === 0) {
      popupFeatures.remove();
    } else {
      popupFeatures.innerHTML = '';
      offerFeatures.forEach(function (feature) {
        var newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature', 'popup__feature--' + feature);
        popupFeatures.appendChild(newFeature);
      });
    }
  };

  var creatBlockPhotos = function (offerPhotos, cardElement) {
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    if (offerPhotos.length === 0) {
      popupPhotos.remove();
    } else {
      offerPhotos.forEach(function (photo) {
        var img = popupPhoto.cloneNode(false);
        img.src = photo;
        popupPhotos.appendChild(img);
      });
      popupPhoto.remove();
    }
  };

  var createCard = function (card) {
    var typeHouse = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ' + String.fromCharCode(0x20BD) + '/ночь';
    cardElement.querySelector('.popup__type').textContent = typeHouse[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = creatMessageCapacity(card);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__avatar').src = card.autor.avatar;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    creatBlockFeatures(card.offer.features, cardElement);
    creatBlockPhotos(card.offer.photos, cardElement);
    return cardElement;
  };

  var renderCard = function (arrayCard) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(arrayCard[1]));
    return fragment;
  };
  window.card = {
    'renderCard': renderCard
  };
})();
