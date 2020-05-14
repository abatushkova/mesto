const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupImageWindow = document.querySelector('.popup_type_img');
const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupCardWindow = document.querySelector('.popup_type_card');
const popupWindows = Array.from(document.querySelectorAll('.popup'));
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

function handlerKeydown(evt) {
  if (evt.key === 'Escape') {
    popupWindows.forEach((popup) => {
      popup.classList.remove('popup_opened');

      document.removeEventListener('keydown', handlerKeydown);
    });
  }
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', handlerKeydown);

  resetErrorMessage();
}

function setFullscreenImgContent(evt) {
  const imgElement = document.querySelector('.popup__img');
  const imgTitle = document.querySelector('.popup__img-title');

  imgElement.src = `${evt.target.src}`;
  imgElement.alt = `${evt.target.alt}`;
  imgTitle.textContent = `${evt.target.alt}`;
}

// open fullscreen img
function openFullscreenImg(evt) {
  evt.preventDefault(); // prevent default href action

  togglePopup(popupImageWindow);
  setFullscreenImgContent(evt);
}

function setCardContent(nameValue, linkValue) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true); // clone template

  const cardImgWrapper = card.querySelector('.elements__img-wrapper');
  const cardImg = card.querySelector('.elements__img');
  const cardImgTitle = card.querySelector('.elements__title');
  const cardLikeBtn = card.querySelector('.elements__like-btn');
  const cardDeleteBtn = card.querySelector('.elements__delete-btn');

  cardImgWrapper.href = linkValue;
  cardImg.src = linkValue;
  cardImg.alt = nameValue;
  cardImgTitle.textContent = nameValue;

  // activate likes on click
  cardLikeBtn.addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like-btn_active');
  });
  // delete cards with img on click
  cardDeleteBtn.addEventListener('click', evt => {
    evt.target.closest('.elements__item').remove();
  });
  // call fullscreen img function on click
  cardImgWrapper.addEventListener('click', openFullscreenImg); 

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
  const inputTypeName = document.querySelector('.popup__input_type_name');
  const inputTypeInfo = document.querySelector('.popup__input_type_info');

  inputTypeName.value = name;
  inputTypeInfo.value = info;
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit

  const inputTypeName = evt.target.querySelector('.popup__input_type_name');
  const inputTypeInfo = evt.target.querySelector('.popup__input_type_info');
  const profileAvatar = document.querySelector('.profile__avatar');

  profileAvatar.alt = inputTypeName.value;
  profileName.textContent = inputTypeName.value;
  profileInfo.textContent = inputTypeInfo.value;
  
  togglePopup(popupProfileWindow);
}

function renderProfilePopup() {
  togglePopup(popupProfileWindow);
  setInputValues(profileName.textContent, profileInfo.textContent);
  enableValidation(popupProfileWindow, formArgs);
  
  popupProfileWindow.addEventListener('submit', formSubmitProfile);
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputCardName = evt.target.querySelector('.popup__input_type_name');
  const inputCardInfo = evt.target.querySelector('.popup__input_type_info');

  const cardContent = setCardContent(inputCardName.value, inputCardInfo.value);
  cardContainer.prepend(cardContent);
  
  togglePopup(popupCardWindow);

  evt.target.reset(); // clear input value
}

function renderCardPopup() {
  togglePopup(popupCardWindow);
  enableValidation(popupCardWindow, formArgs);

  popupCardWindow.addEventListener('submit', formSubmitCard);
}

buttonEdit.addEventListener('click', renderProfilePopup);
buttonAdd.addEventListener('click', renderCardPopup);

popupWindows.forEach((popup) => {
  popup.addEventListener('click', evt => {
    if (evt.target.matches('.popup__close-btn') || evt.target.matches('.popup_opened')) {
      togglePopup(popup);
    }
  });
});
