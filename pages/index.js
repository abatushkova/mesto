const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__job');
const popupImageWindow = document.querySelector('.popup_type_img');
const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupCardWindow = document.querySelector('.popup_type_card');

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
      placeholder: 'Имя'
    },
  inputInfo:
    {
      name: 'job',
      placeholder: 'О себе'
    },
  submitButton: 'Сохранить',
  submitAction: 'formProfileSubmit'
};

const cardPopup = {
  className: 'popup_type_card',
  title: 'Новое место',
  form: 'card',
  inputName: 
    {
      name: 'name',
      placeholder: 'Название'
    },
  inputInfo:
    {
      name: 'src',
      placeholder: 'Ссылка'
    },
  submitButton: 'Создать',
  submitAction: 'formCardSubmit'
};

function togglePopup(popup) {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
  } else {
    popup.classList.remove('popup_opened');
    
    while (popup.firstChild) {
      popup.removeChild(popup.firstChild);
    }
  }
}

// create content to fullscreen img
function createImgPopup(evt) {
  const imgTemplate = document.querySelector('#img-popup').content;
  const imgContainer = imgTemplate.cloneNode(true); // clone template

  const imgElement = imgContainer.querySelector('.popup__img');
  const imgTitle = imgContainer.querySelector('.popup__img-title');
  const imgCloseBtn = imgContainer.querySelector('.popup__close-btn');

  imgElement.setAttribute('src', `${evt.target.src}`);
  imgElement.setAttribute('alt', `${evt.target.alt}`);
  imgTitle.textContent = `${evt.target.alt}`;

  imgCloseBtn.addEventListener('click', () => {
    togglePopup(popupImageWindow)
  });

  popupImageWindow.append(imgContainer);
}

// open fullscreen img
function openFullscreenImg(evt) {
  evt.preventDefault(); // prevent default href action

  togglePopup(popupImageWindow);
  createImgPopup(evt);
}

function setCardContent(nameValue, linkValue, orderValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardContainer = document.querySelector('.elements');
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

  // add card to card-container
  if (orderValue === 'prepend') {
    cardContainer.prepend(card);
  }
  cardContainer.append(card);
}

function createInitialCards() {
  const methodName = 'append';

  initialCards.forEach(card => {
    setCardContent(card.name, card.link, methodName);
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
  const popupContaier = document.querySelector(`.${popup.className}`);
  const popupElement = popupTemplate.cloneNode(true); // clone template

  const popupTitle = popupElement.querySelector('.popup__title');
  const popupForm = popupElement.querySelector('.popup__form');
  const inputTypeName = popupElement.querySelector('.popup__input_type_name');
  const inputTypeInfo = popupElement.querySelector('.popup__input_type_info');
  const popupSaveBtn = popupElement.querySelector('.popup__save-btn');
  const popupCloseBtn = popupElement.querySelector('.popup__close-btn');
  
  // set popup-container content
  popupTitle.textContent = popup.title;
  popupForm.name = popup.form;
  inputTypeName.name = popup.inputName.name;
  inputTypeName.placeholder = popup.inputName.placeholder;
  inputTypeInfo.name = popup.inputInfo.name;
  inputTypeInfo.placeholder = popup.inputInfo.placeholder;
  popupSaveBtn.textContent = popup.submitButton;

  popupCloseBtn.addEventListener('click', () => {
    togglePopup(popupContaier);
  });

  // add element to popup
  popupContaier.append(popupElement);
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
    profileAvatar.setAttribute('alt', inputTypeName.value);
  }
  
  // set new profile job if it's different
  if (profileInfo.textContent !== inputTypeInfo.value) {
    profileInfo.textContent = inputTypeInfo.value;
  }
  
  togglePopup(popupProfileWindow);
}

function editProfile() {
  togglePopup(popupProfileWindow);

  if (!popupProfileWindow.firstChild) {
    createDefaultPopup(profilePopup);
    setInputValues(profileName.textContent, profileInfo.textContent);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitProfile);
  } 
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit

  const inputItems = document.querySelectorAll('.popup__input');
  const inputCardName = document.querySelector('.popup__input_type_name');
  const inputCardInfo = document.querySelector('.popup__input_type_info');
  const methodName = 'prepend';

  // add new card if input is filled
  if (!inputCardName.value || !inputCardInfo.value) {
    // change appearance of empty input
    inputItems.forEach(input => {
      input.style.borderBottomColor = '#dc143c';
      input.placeholder = 'Поле является обязательным';
    });
  } else {
    setCardContent(inputCardName.value, inputCardInfo.value, methodName);
    togglePopup(popupCardWindow);
  }
}

function addCard() {
  togglePopup(popupCardWindow);

  if (!popupCardWindow.firstChild) {
    createDefaultPopup(cardPopup);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitCard);
  } 
}

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', addCard);
