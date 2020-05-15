const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

const popupImageWindow = document.querySelector('.popup_type_img');
const imgElement = document.querySelector('.popup__img');
const imgTitle = document.querySelector('.popup__img-title');
const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupCardWindow = document.querySelector('.popup_type_card');
const popupWindows = Array.from(document.querySelectorAll('.popup'));
const inputTypeName = document.querySelector('.popup__input_type_name');
const inputTypeInfo = document.querySelector('.popup__input_type_info');

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

function resetErrorMessage() {
  const errorList = Array.from(document.querySelectorAll('.popup__error'));
  const inputList = Array.from(document.querySelectorAll('.popup__input'));

  errorList.forEach((error) => error.textContent = '');
  inputList.forEach((error) => error.classList.remove('popup__input_type_error'));
}

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

function setInputValues(name, info) {
  // const inputTypeName = document.querySelector('.popup__input_type_name');
  // const inputTypeInfo = document.querySelector('.popup__input_type_info');

  inputTypeName.value = name;
  inputTypeInfo.value = info;
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit

  // const inputTypeName = evt.target.querySelector('.popup__input_type_name');
  // const inputTypeInfo = evt.target.querySelector('.popup__input_type_info');

  profileAvatar.alt = inputTypeName.value;
  profileName.textContent = inputTypeName.value;
  profileInfo.textContent = inputTypeInfo.value;
  
  togglePopup(popupProfileWindow);

  evt.target.reset(); // clear input value
}

function renderProfilePopup() {
  resetErrorMessage();
  togglePopup(popupProfileWindow);
  setInputValues(profileName.textContent, profileInfo.textContent);
  enableValidation(formArgs);
  
  popupProfileWindow.addEventListener('submit', formSubmitProfile);
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputCardName = evt.target.querySelector('.popup__input_type_name');
  const inputCardInfo = evt.target.querySelector('.popup__input_type_info');

  // const cardContent = setCardContent(inputTypeName.value, inputTypeInfo.value);
  const cardContent = setCardContent(inputCardName.value, inputCardInfo.value);
  cardContainer.prepend(cardContent);
  
  togglePopup(popupCardWindow);

  evt.target.reset(); // clear input value
}

function renderCardPopup() {
  resetErrorMessage();
  togglePopup(popupCardWindow);
  enableValidation(formArgs);

  popupCardWindow.addEventListener('submit', formSubmitCard);
}

buttonEdit.addEventListener('click', renderProfilePopup);
buttonAdd.addEventListener('click', renderCardPopup);

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
