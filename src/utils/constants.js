import edinburghCastle from '../images/elements/__img/edinburgh_castle.jpg';
import goldenGate from '../images/elements/__img/golden_gate.jpg';
import grindaIsland from '../images/elements/__img/grinda_island.jpg';
import kyoto from '../images/elements/__img/kyoto.jpg';
import montSaintMichel from '../images/elements/__img/mont-saint-michel.jpg';
import mountainMatterhorn from '../images/elements/__img/mountain_matterhorn.jpg';

export const buttonAdd = document.querySelector('.profile__add-btn');
export const buttonEdit = document.querySelector('.profile__edit-btn');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');

export const popupProfileWindow = document.querySelector('.popup_type_profile');
export const popupCardWindow = document.querySelector('.popup_type_card');
export const popupImageWindow = document.querySelector('.popup_type_img');
export const popupImgElement = document.querySelector('.popup__img');
export const popupImgTitle = document.querySelector('.popup__img-title');

export const profilePopupForm = document.forms.profile;
export const inputProfileName = profilePopupForm.elements.name;
export const inputProfileInfo = profilePopupForm.elements.info;

export const cardContainer = document.querySelector('.elements');

export const initialCards = [
  {
    name: 'Эдинбургский замок',
    link: edinburghCastle
  },
  {
    name: 'Золотые ворота',
    link: goldenGate
  },
  {
    name: 'Гринда',
    link: grindaIsland
  },
  {
    name: 'Кинкаку-дзи',
    link: kyoto
  },
  {
    name: 'Мон-Сен-Мишель',
    link: montSaintMichel
  },
  {
    name: 'Маттерхорн',
    link: mountainMatterhorn
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
