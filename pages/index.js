import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

class InitialCard extends Card {
  constructor(data, cardSelector) {
    super(data, cardSelector);
	}
}

class UserCard extends Card {
  constructor(data, cardSelector) {
    super(data, cardSelector);
  }
}

class CardFormValidator extends FormValidator {
  constructor(formArgs, popupSelector) {
    super(formArgs, popupSelector);
  }
}

class ProfileFormValidator extends FormValidator {
  constructor(formArgs, popupSelector) {
    super(formArgs, popupSelector);
  }

  _setInputValues() {
    inputProfileName.value = profileName.textContent;
    inputProfileInfo.value = profileInfo.textContent;
  }
}

const buttonAdd = document.querySelector('.profile__add-btn');
const buttonEdit = document.querySelector('.profile__edit-btn');
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupCardWindow = document.querySelector('.popup_type_card');
const popupWindows = Array.from(document.querySelectorAll('.popup'));

const profilePopupForm = document.forms.profile;
const cardPopupForm = document.forms.card;
const inputProfileName = profilePopupForm.elements.name;
const inputProfileInfo = profilePopupForm.elements.info;
const inputCardName = cardPopupForm.elements.title;
const inputCardSrc = cardPopupForm.elements.src;

const cardContainer = document.querySelector('.elements');

const initialCards = [
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

const formArgs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__submit-btn',
  inactiveSubmitClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardValidator = new CardFormValidator(formArgs, '.popup_type_card');
const profileValidator = new ProfileFormValidator(formArgs, '.popup_type_profile');

export function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    popupWindows.forEach((popup) => {
      popup.classList.remove('popup_opened');

      document.removeEventListener('keydown', handleKeydown);
    });
  }
}

export function handleCloseBtn(evt) {
  if (
    evt.target.classList.contains('popup__close-btn') 
    || evt.target.classList.contains('popup_opened')
  ) {
    evt.currentTarget.classList.remove('popup_opened');

    document.removeEventListener('click', handleCloseBtn);
  }  
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', handleKeydown);
  popup.addEventListener('click', handleCloseBtn);
}

(function createInitialCards() {
  initialCards.forEach((item) => {
    const card = new InitialCard(item, '#card');

    const cardElement = card.generateCard();

    cardContainer.append(cardElement);
  });
})();

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputValues = {
    name: inputCardName.value,
    link: inputCardSrc.value
  };
  const card = new UserCard(inputValues, '#card');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
  
  togglePopup(popupCardWindow);
  
  evt.target.reset(); // clean input value after submit
}

function renderCardPopup() {
  cardValidator._cleanForm();
  cardValidator._toggleBtnState();

  togglePopup(popupCardWindow);
  
  popupCardWindow.addEventListener('submit', formSubmitCard);
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit

  profileAvatar.alt = inputProfileName.value;
  profileName.textContent = inputProfileName.value;
  profileInfo.textContent = inputProfileInfo.value;
  
  togglePopup(popupProfileWindow);

  evt.target.reset(); // clean input value after submit
}

function renderProfilePopup() {
  profileValidator._cleanForm();
  profileValidator._setInputValues();
  profileValidator._toggleBtnState();
  
  togglePopup(popupProfileWindow);

  popupProfileWindow.addEventListener('submit', formSubmitProfile);
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);

cardValidator.enableValidation();
profileValidator.enableValidation();
