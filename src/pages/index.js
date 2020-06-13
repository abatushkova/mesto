import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  formArgs,
  inputProfileName,
  inputProfileInfo,
  profileAvatar,
  profileName,
  profileInfo,
  initialCards,
  cardContainer,
  popupImageWindow,
  popupProfileWindow,
  popupCardWindow
} from '../utils/constants.js';

const cardValidator = new FormValidator(formArgs, '.popup_type_card');
const profileValidator = new FormValidator(formArgs, '.popup_type_profile');

const handleCardClick = (evt) => {
  const imgPopup = new PopupWithImg(popupImageWindow);

  imgPopup.openPopup(evt);
}

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', handleCardClick);
    const cardElement = card.generateCard();

    initialCardList.addItem(cardElement);
  }
}, cardContainer);

const addUserCard = (card, container) => {
  container.prepend(card);
}

const handleCardFormSubmit = (formValues) => {
  const inputValues = {
    name: formValues.title,
    link: formValues.src
  };

  const userCard = new Card(inputValues, '#card', handleCardClick);
  const cardElement = userCard.generateCard();

  addUserCard(cardElement, cardContainer);
}

const cardPopup = new PopupWithForm(
  popupCardWindow, handleCardFormSubmit
);

const renderCardPopup = () => {
  cardPopup.openPopup();
}

const profile = new UserInfo({
  userName: profileName,
  userInfo: profileInfo,
  userImg: profileAvatar
});

const handleProfileFormSubmit = (formValues) => {
  profile.setUserInfo(formValues);
}

const profilePopup = new PopupWithForm(
  popupProfileWindow, handleProfileFormSubmit
);

const renderProfilePopup = () => {
  const profileElement = profile.getUserInfo();

  inputProfileName.value = profileElement.name;
  inputProfileInfo.value = profileElement.info;

  profilePopup.openPopup();
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);

cardValidator.enableValidation();
profileValidator.enableValidation();
initialCardList.renderItems();
