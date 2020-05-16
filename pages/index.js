const buttonAdd = document.querySelector('.profile__add-btn');
const buttonEdit = document.querySelector('.profile__edit-btn');
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const popupImageWindow = document.querySelector('.popup_type_img');
const imgElement = document.querySelector('.popup__img');
const imgTitle = document.querySelector('.popup__img-title');
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
const cardTemplate = document.querySelector('#card').content;

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
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const makeClaener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const errorCleaner = () => {
    inputList.forEach((inputElement) => {
      inputElement.value = ''; // clean input value

      hideInputError(formElement, inputElement, formArgs);
    });
  };

  return errorCleaner;
};

const cleanProfileForm = makeClaener(profilePopupForm);
const cleanCardForm = makeClaener(cardPopupForm);

function handleKeydown(evt) {
  if (evt.key === 'Escape') {
    popupWindows.forEach((popup) => {
      popup.classList.remove('popup_opened');

      document.removeEventListener('keydown', handleKeydown);
    });
  }
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', handleKeydown);
}

function setFullscreenImgContent(evt) {
  imgElement.src = evt.target.src;
  imgElement.alt = evt.target.alt;
  imgTitle.textContent = evt.target.alt;
}

function openFullscreenImg(evt) {
  if (evt.target.closest('.elements__img-wrapper')) {
    evt.preventDefault(); // prevent default href action

    setFullscreenImgContent(evt);
    togglePopup(popupImageWindow);
  }
}

function handleLikeBtn(evt) {
  if (evt.target.classList.contains('elements__like-btn')) {
    evt.target.classList.toggle('elements__like-btn_active');
  }
}

function handleDeleteBtn(evt) {
  const cardElement = evt.currentTarget;

  if (evt.target.classList.contains('elements__delete-btn')) {
    cardElement.removeEventListener('click', openFullscreenImg);
    cardElement.removeEventListener('click', handleLikeBtn);
    cardElement.removeEventListener('click', handleDeleteBtn);
  
    evt.target.closest('.elements__item').remove();
  }
}

function setCardContent(nameValue, linkValue) {
  const card = cardTemplate.cloneNode(true); // clone template

  const cardElement = card.querySelector('.elements__item');
  const cardImgWrapper = card.querySelector('.elements__img-wrapper');
  const cardImg = card.querySelector('.elements__img');
  const cardImgTitle = card.querySelector('.elements__title');

  cardImgWrapper.href = linkValue;
  cardImg.src = linkValue;
  cardImg.alt = nameValue;
  cardImgTitle.textContent = nameValue;

  // call fullscreen img function on click
  cardElement.addEventListener('click', openFullscreenImg); 
  // activate likes on click
  cardElement.addEventListener('click', handleLikeBtn);
  // delete cards with img on click
  cardElement.addEventListener('click', handleDeleteBtn);

  return card;
}

function createInitialCards() {
  initialCards.forEach((card) => {
    const cardContent = setCardContent(card.name, card.link);

    cardContainer.append(cardContent);
  });
};

createInitialCards();

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const cardContent = setCardContent(inputCardName.value, inputCardSrc.value);
  cardContainer.prepend(cardContent);
  
  togglePopup(popupCardWindow);
  
  evt.target.reset(); // clean input value after submit
}

function renderCardPopup() {
  cleanCardForm();
  enableValidation(formArgs);
  togglePopup(popupCardWindow);
  
  popupCardWindow.addEventListener('submit', formSubmitCard);
}

function setInputValues(name, info) {
  inputProfileName.value = name;
  inputProfileInfo.value = info;
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
  cleanProfileForm();
  setInputValues(profileName.textContent, profileInfo.textContent);
  enableValidation(formArgs);
  togglePopup(popupProfileWindow);
  
  popupProfileWindow.addEventListener('submit', formSubmitProfile);
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);

popupWindows.forEach((popup) => {
  popup.addEventListener('click', evt => {
    if (
      evt.target.classList.contains('popup__close-btn') 
      || evt.target.classList.contains('popup_opened')
    ) {
      togglePopup(popup);
    }
  });
});
