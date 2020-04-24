const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__job');

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
  class: 'popup_type_profile',
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
  submitButton: 'Сохранить'
};

const cardPopup = {
  class: 'popup_type_card',
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
  submitButton: 'Создать'
};


function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup() {
  const popupWindows = document.querySelectorAll('.popup');

  popupWindows.forEach(elm => {
    elm.classList.remove('popup_opened');
    
    while (elm.firstChild && 
      !elm.classList.contains('popup_type_img')) {
      elm.removeChild(elm.firstChild);
    }
  });
}

// set content to fullscreen img
function createImgPopup(evt) {
  document.querySelector('.popup__img').setAttribute('src', `${evt.target.src}`);
  document.querySelector('.popup__img').setAttribute('alt', `${evt.target.alt}`);
  document.querySelector('.popup__img-title').textContent = `${evt.target.alt}`;

  document.querySelector('.popup__close-btn').addEventListener('click', closePopup);
}

// open fullscreen img
function openFullscreenImg(evt) {
  evt.preventDefault(); // prevent default href action

  const popupImageWindow = document.querySelector('.popup_type_img');

  openPopup(popupImageWindow);
  createImgPopup(evt);
}

function setCardContent(nameValue, linkValue, orderValue) {
  const cardTemplate = document.querySelector('#card').content;
  const cardContainer = document.querySelector('.elements');
  // clone template content
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.elements__img-wrapper').href = linkValue;
  cardElement.querySelector('.elements__img').src = linkValue;
  cardElement.querySelector('.elements__img').alt = nameValue;
  cardElement.querySelector('.elements__title').textContent = nameValue;

  // activate likes on click
  cardElement.querySelector('.elements__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like-btn_active');
  })
  // delete cards with image on click
  cardElement.querySelector('.elements__delete-btn').addEventListener('click', evt => {
    evt.target.closest('.elements__item').remove();
  });
  // call fullscreen image function on click
  cardElement.querySelector('.elements__img-wrapper').addEventListener('click', openFullscreenImg); 

  // add card to card-container
  if (orderValue === 'prepend') {
    cardContainer.prepend(cardElement);
  }
  cardContainer.append(cardElement);
}

function createInitialCards() {
  const addOrder = 'append';

  initialCards.forEach(elm => {
    setCardContent(elm.name, elm.link, `${addOrder}`);
  });
};

function setInputValues(name, info) {
  const inputNameValue = document.querySelector('.popup__input_type_name');
  const inputInfoValue = document.querySelector('.popup__input_type_info');

  inputNameValue.value = name;
  inputInfoValue.value = info;
}

function createDefaultPopup(item) {
  const popupTemplate = document.querySelector('#submit-popup').content;
  const popup = document.querySelector(`.${item.class}`);
  
  // clone template content
  const popupElement = popupTemplate.cloneNode(true);
  
  // set popup-container content
  popupElement.querySelector('.popup__title').textContent = item.title;
  popupElement.querySelector('.popup__form').name = item.form;
  popupElement.querySelector('.popup__input_type_name').name = item.inputName.name;
  popupElement.querySelector('.popup__input_type_name').placeholder = item.inputName.placeholder;
  popupElement.querySelector('.popup__input_type_info').name = item.inputInfo.name;
  popupElement.querySelector('.popup__input_type_info').placeholder = item.inputInfo.placeholder;
  popupElement.querySelector('.popup__save-btn').textContent = item.submitButton;

  // add element to popup
  popup.append(popupElement);

  document.querySelector('.popup__close-btn').addEventListener('click', closePopup);
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputNameValue = document.querySelector('.popup__input_type_name');
  const inputInfoValue = document.querySelector('.popup__input_type_info');
  
  // set new profile name if it's different
  if (profileName.textContent !== inputNameValue.value) {
    profileName.textContent = inputNameValue.value;

    // set profile name as avatar alt
    document.querySelector('.profile__avatar').setAttribute('alt', inputNameValue.value);
  }
  
  // set new profile job if it's different
  if (profileInfo.textContent !== inputInfoValue.value) {
    profileInfo.textContent = inputInfoValue.value;
  }
  
  closePopup();
}

function editProfile() {
  const popupProfileWindow = document.querySelector('.popup_type_profile');

  openPopup(popupProfileWindow);

  if (!popupProfileWindow.firstChild) {
    createDefaultPopup(profilePopup);
    setInputValues(profileName.textContent, profileInfo.textContent);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitProfile);
  } 
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit

  const inputCardName = document.querySelector('.popup__input_type_name');
  const inputCardInfo = document.querySelector('.popup__input_type_info');
  const addOrder = 'prepend';

  // add new card to page if input is filled
  if (inputCardName.value && inputCardInfo.value) {
    setCardContent(inputCardName.value, inputCardInfo.value, `${addOrder}`);
  }

  closePopup();
}

function addCard() {
  const popupCardWindow = document.querySelector('.popup_type_card');

  openPopup(popupCardWindow);

  if (!popupCardWindow.firstChild) {
    createDefaultPopup(cardPopup);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitCard);
  } 
}


buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', addCard);

window.onload = createInitialCards();
