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
  buttonUpdateAv,
  formArgs,
  cardContainer,
  popupImageWindow,
  popupImgElement,
  popupImgTitle,
  popupCardWindow,
  popupConfirmWindow,
  popupConfirmBtn,
  popupAvatarWindow,
  popupProfileWindow,
  profileName,
  profileInfo,
  profileAvatar,
  inputProfileName,
  inputProfileInfo
} from '../utils/constants.js';

const cardValidator = new FormValidator(formArgs, '.popup_type_card');
const profileValidator = new FormValidator(formArgs, '.popup_type_profile');
const avatarValidator = new FormValidator(formArgs, '.popup_type_avatar');

const profile = new UserInfo({
  userName: profileName,
  userInfo: profileInfo,
  userAvatar: profileAvatar,
  inputName: inputProfileName,
  inputInfo: inputProfileInfo
});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'bd0f2499-7585-4f83-9366-da3fa3857f94',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  setInitialUser(user);
  renderInitialCards(cards, user._id);
})
.catch(err => console.error(err));

function setInitialUser(user) {
  profile.setUserInfo(user);
  profile.setUserAvatar(user);
}

function renderInitialCards(cards, userId) {
  const initialCards = new Section({
    items: cards,
    renderer: (card) => {
      const cardElement = createCard(card, userId);

      initialCards.addItem(cardElement);
    }
  }, cardContainer);

  initialCards.renderItems();
}

function createCard(item, userId) {
  const card = new Card(item, '#card', api, {
    handleCardClick: renderImgPopup,
    renderConfirmPopup: renderConfirmPopup,
    initialUserId: userId
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const imgPopup = new PopupWithImg(popupImageWindow, {
  imgElement: popupImgElement,
  imgTitle: popupImgTitle
});
const confirmPopup = new PopupWithConfirm(
  popupConfirmWindow, popupConfirmBtn
);

function renderImgPopup(evt) {
  imgPopup.open(evt);
}

function renderConfirmPopup(callback) {
  confirmPopup.open(callback);
}

function addUserCard(card, container) {
  container.prepend(card);
}

function renderUserCard(card, userId) {
  const cardElement = createCard(card, userId);

  addUserCard(cardElement, cardContainer);
}

const cardPopup = new PopupWithForm(
  popupCardWindow, handleCardFormSubmit
);

function renderCardPopup() {
  cardPopup.open();
}

function handleCardFormSubmit(formValues) {
  return api.postUserCard(formValues)
  .then(card => renderUserCard(card, card.owner._id));
}

const profilePopup = new PopupWithForm(
  popupProfileWindow, handleProfileFormSubmit
);

function renderProfilePopup() {
  profile.getUserInfo();
  profilePopup.open();
}

function handleProfileFormSubmit(formValues) {
  return api.updateUserInfo(formValues)
  .then(user => profile.setUserInfo(user));
}

const avatarPopup = new PopupWithForm(
  popupAvatarWindow, handleAvatarFormSubmit
);

function renderAvatarPopup() {
  avatarPopup.open();
}

function handleAvatarFormSubmit(formValues) {
  return api.updateUserAvatar(formValues)
  .then(user => profile.setUserAvatar(user));
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);
buttonUpdateAv.addEventListener('click', renderAvatarPopup);

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();
