import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  buttonSubmit,
  buttonUpdateAv,
  formArgs,
  cardContainer,
  popupImageWindow,
  popupProfileWindow,
  popupCardWindow,
  popupConfirmWindow,
  popupAvatarWindow
} from '../utils/constants.js';

const cardValidator = new FormValidator(formArgs, '.popup_type_card');
const profileValidator = new FormValidator(formArgs, '.popup_type_profile');
const avatarValidator = new FormValidator(formArgs, '.popup_type_avatar');

const profile = new UserInfo();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'bd0f2499-7585-4f83-9366-da3fa3857f94',
    'Cache-Control': 'no-cache'
  }
});

let ownerId;

function setOwnerId(user) {
  ownerId = user._id;
}

function logError(err) {
  console.error(err);
};

function setInitialUser(user) {
  profile.setUserInfo(user);
  profile.setUserAvatar(user);
};

api.getInitialUserInfo('/users/me')
.then(user => {
  setOwnerId(user);
  setInitialUser(user);
})
.catch(logError);

const imgPopup = new PopupWithImg(popupImageWindow);

const renderImgPopup = (evt) => {
  imgPopup.open(evt);
};

const confirmPopup = new PopupWithConfirm(popupConfirmWindow);

const renderConfirmPopup = (callback) => {
  confirmPopup.open(callback);
};

const renderInitialCards = (cardList) => {
  const initialCardList = new Section({
    items: cardList,
    renderer: (item) => {
      const card = new Card(item, '#card', api, {
        handleCardClick: renderImgPopup,
        renderConfirmPopup: renderConfirmPopup,
        ownerId: ownerId
      });
      const cardElement = card.generateCard();

      initialCardList.addItem(cardElement);
    }
  }, cardContainer);

  return initialCardList;
}

api.getInitialCards('/cards')
.then(renderInitialCards)
.then(initialCardList => initialCardList.renderItems())
.catch(logError);

const addUserCard = (card, container) => {
  container.prepend(card);
};

const renderUserCard = (card) => {
  const userCard = new Card(card, '#card', api, {
    handleCardClick: renderImgPopup,
    renderConfirmPopup: renderConfirmPopup,
    ownerId: ownerId
  });
  const cardElement = userCard.generateCard();

  addUserCard(cardElement, cardContainer);
}

const renderLoading = (isLoading, text) => {
  buttonSubmit.textContent = isLoading
    ? (text === 'Сохранить'
      ? 'Сохранение...'
      : 'Создание...')
    : text;
}

const handleCardFormSubmit = (formValues) => {
  renderLoading(true, 'Создать');

  api.postUserCard('/cards', formValues)
  .then(renderUserCard)
  .catch(logError)
  .finally(() => renderLoading(false, 'Создать'));
};

const cardPopup = new PopupWithForm(
  popupCardWindow, handleCardFormSubmit
);

const renderCardPopup = () => {
  cardPopup.open();
};

const handleProfileFormSubmit = (formValues) => {
  renderLoading(true, 'Сохранить');

  profile.setUserInfo(formValues);

  api.updateUserInfo('/users/me', formValues)
  .catch(logError)
  .finally(() => renderLoading(false, 'Сохранить'));
};

const profilePopup = new PopupWithForm(
  popupProfileWindow, handleProfileFormSubmit
);

const renderProfilePopup = () => {
  profile.getUserInfo();
  profilePopup.open();
};

const handleAvatarFormSubmit = (formValues) => {
  renderLoading(true, 'Сохранить');

  profile.setUserAvatar(formValues);

  api.updateUserAvatar('/users/me/avatar', formValues)
  .catch(logError)
  .finally(() => renderLoading(false, 'Сохранить'));
}

const avatarPopup = new PopupWithForm(popupAvatarWindow, handleAvatarFormSubmit);

const renderAvatarPopup = () => {
  avatarPopup.open();
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);
buttonUpdateAv.addEventListener('click', renderAvatarPopup);

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();
