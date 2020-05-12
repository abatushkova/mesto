const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__job');
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

const profilePopup = {
  className: 'popup_type_profile',
  title: 'Редактировать профиль',
  form: 'profile',
  inputName: 
    {
      name: 'name',
      placeholder: 'Имя',
      type: 'text'
    },
  inputInfo:
    {
      name: 'job',
      placeholder: 'О себе',
      type: 'text'
    },
  submitButton: 'Сохранить'
};

const cardPopup = {
  className: 'popup_type_card',
  title: 'Новое место',
  form: 'card',
  inputName: 
    {
      name: 'name',
      placeholder: 'Название',
      type: 'text'
    },
  inputInfo:
    {
      name: 'src',
      placeholder: 'Ссылка',
      type: 'url'
    },
  submitButton: 'Создать'
};

function togglePopupFocus(popup) {
  if (!popup.hasAttribute('tabindex')) {
    popup.setAttribute('tabindex', 1);
    popup.focus();
  } else {
    popup.removeAttribute('tabindex');
    popup.blur();
  }
}

function removePopupChildElm(popup) {
  while (popup.firstChild && !popup.classList.contains('popup_type_img')) {
    popup.removeChild(popup.firstChild);
  }
}

function handleEscButton(evt) {
  if (evt.key === 'Escape') {
    togglePopup(evt.currentTarget);
  }
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  togglePopupFocus(popup);
  removePopupChildElm(popup);
  
  if (popup.classList.contains('popup_opened')) {
    popup.addEventListener('keydown', handleEscButton, true);
  } else {
    popup.removeEventListener('keydown', handleEscButton, true);
  }
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
  initialCards.forEach(card => {
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

function createDefaultPopup(popup) {
  const popupTemplate = document.querySelector('#submit-popup').content;
  const popupContainer = document.querySelector(`.${popup.className}`);
  const popupElement = popupTemplate.cloneNode(true); // clone template

  const popupTitle = popupElement.querySelector('.popup__title');
  const popupForm = popupElement.querySelector('.popup__form');
  const inputTypeName = popupElement.querySelector('.popup__input_type_name');
  const inputTypeInfo = popupElement.querySelector('.popup__input_type_info');
  const popupSubmitBtn = popupElement.querySelector('.popup__submit-btn');
  
  // set popup-container content
  popupTitle.textContent = popup.title;
  popupForm.name = popup.form;
  inputTypeName.name = popup.inputName.name;
  inputTypeName.placeholder = popup.inputName.placeholder;
  inputTypeName.type = popup.inputName.type;
  inputTypeInfo.name = popup.inputInfo.name;
  inputTypeInfo.placeholder = popup.inputInfo.placeholder;
  inputTypeInfo.type = popup.inputInfo.type;
  popupSubmitBtn.textContent = popup.submitButton;

  popupContainer.append(popupElement);

  return popupContainer;
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputTypeName = document.querySelector('.popup__input_type_name');
  const inputTypeInfo = document.querySelector('.popup__input_type_info');
  const profileAvatar = document.querySelector('.profile__avatar');

  // set new profile name if it's different
  if (profileName.textContent !== inputTypeName.value) {
    profileName.textContent = inputTypeName.value;

    // set profile name as avatar alt
    profileAvatar.alt = inputTypeName.value;
  }
  
  // set new profile job if it's different
  if (profileInfo.textContent !== inputTypeInfo.value) {
    profileInfo.textContent = inputTypeInfo.value;
  }
  
  togglePopup(popupProfileWindow);
}

function createProfilePopup() {
  const popup = createDefaultPopup(profilePopup);

  popup.addEventListener('input', enableValidation);
  popup.addEventListener('submit', formSubmitProfile);
}

function editProfile() {
  togglePopup(popupProfileWindow);

  if (!popupProfileWindow.firstChild) {
    createProfilePopup();
    setInputValues(profileName.textContent, profileInfo.textContent);
  } 
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit

  const inputCardName = document.querySelector('.popup__input_type_name');
  const inputCardInfo = document.querySelector('.popup__input_type_info');

  const cardContent = setCardContent(inputCardName.value, inputCardInfo.value);

  cardContainer.prepend(cardContent);

  togglePopup(popupCardWindow);
}

function createCardPopup() {
  const popup = createDefaultPopup(cardPopup);

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });    

  popup.addEventListener('submit', formSubmitCard);
}

function addCard() {
  togglePopup(popupCardWindow);

  if (!popupCardWindow.firstChild) {
    createCardPopup();
  } 
}

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', addCard);

popupWindows.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.matches('.popup__close-btn') || evt.target.matches('.popup_opened')) {
      togglePopup(popup);
    }
  });
});
