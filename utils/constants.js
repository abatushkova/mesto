export const buttonAdd = document.querySelector('.profile__add-btn');
export const buttonEdit = document.querySelector('.profile__edit-btn');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');

export const popupWindows = Array.from(document.querySelectorAll('.popup'));
export const popupProfileWindow = document.querySelector('.popup_type_profile');
export const popupCardWindow = document.querySelector('.popup_type_card');
export const popupImageWindow = document.querySelector('.popup_type_img');
export const popupImgElement = document.querySelector('.popup__img');
export const popupImgTitle = document.querySelector('.popup__img-title');

export const profilePopupForm = document.forms.profile;
export const cardPopupForm = document.forms.card;
export const inputProfileName = profilePopupForm.elements.name;
export const inputProfileInfo = profilePopupForm.elements.info;
export const inputCardName = cardPopupForm.elements.title;
export const inputCardSrc = cardPopupForm.elements.src;

export const cardContainer = document.querySelector('.elements');

export const initialCards = [
  {
    name: 'Эдинбургский замок',
    link: './images/elements/__img/edinburgh_castle.jpg'
  },
  {
    name: 'Золотые ворота',
    link: './images/elements/__img/golden_gate.jpg'
  },
  {
    name: 'Гринда',
    link: './images/elements/__img/grinda_island.jpg'
  },
  {
    name: 'Кинкаку-дзи',
    link: './images/elements/__img/kyoto.jpg'
  },
  {
    name: 'Мон-Сен-Мишель',
    link: './images/elements/__img/mont-saint-michel.jpg'
  },
  {
    name: 'Маттерхорн',
    link: './images/elements/__img/mountain_matterhorn.jpg'
  }
];

export const formArgs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__submit-btn',
  inactiveSubmitClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
