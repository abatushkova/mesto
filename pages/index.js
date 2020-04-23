const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const infoInput = document.querySelector('.popup__input_type_info');
// const formElement = document.querySelector('.popup__form');
// const formCard = document.querySelector('.popup__form_type_card');

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
}

function createInitialCards() {
  const cardTemplate = document.querySelector('#card').content;
  const cardContainer = document.querySelector('.elements');
  
  initialCards.forEach(elm => {
    // clone template content
    const cardElement = cardTemplate.cloneNode(true);
    
    // set card content
    cardElement.querySelector('.elements__img-wrapper').href = elm.link;
    cardElement.querySelector('.elements__img').src = elm.link;
    cardElement.querySelector('.elements__img').alt = `${elm.name}`;
    cardElement.querySelector('.elements__title').textContent = elm.name;

    // add card to card-container
    cardContainer.append(cardElement);
  });
};

window.onload = createInitialCards();

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

function setInputValues(title, info) {
  inputName.value = title;
  inputInfo.value = info;
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

  // add to popup
  popup.append(popupElement);

  document.querySelector('.popup__close-btn').addEventListener('click', closePopup);
}

function editProfile() {
  const popupProfileWindow = document.querySelector('.popup_type_profile');

  openPopup(popupProfileWindow);

  if (!popupProfileWindow.firstChild) {
    createDefaultPopup(profilePopup);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitProfile);
    // document.querySelector('.popup__close-btn').addEventListener('click', closePopup);
  } 
}

function formSubmitProfile(evt) {
  evt.preventDefault(); // prevent default action of submit
  
  const inputElement = document.querySelectorAll('.popup__input');
  // set new profile name if it's different 
  for (let i = 0; i < inputElement.length; i++) {
    console.log(inputElement[i]);
    nameProfile.textContent = inputElement[i].value;

  }

  // if (nameProfile.textContent !== inputElement.value) {
  //   nameProfile.textContent = inputElement.value;
  //   console.log(inputElement.value);

  //   // set profile name as avatar alt
  //   document.querySelector('.profile__avatar').setAttribute('alt', `${profilePopup.input.value}.`);
  // }
  
  // set new profile job if it's different
  // if (jobProfile.textContent !== profilePopup.input.value) {
  //   jobProfile.textContent = profilePopup.input.value;
  // }
  
  closePopup();
}

// add card to page
function addCard() {
  const popupCardWindow = document.querySelector('.popup_type_card');

  openPopup(popupCardWindow);

  if (!popupCardWindow.firstChild) {
    createDefaultPopup(cardPopup);

    document.querySelector('.popup__form').addEventListener('submit', formSubmitCard);
    // document.querySelector('.popup__close-btn').addEventListener('click', closePopup);
  } 
}

function formSubmitCard(evt) {
  evt.preventDefault(); // prevent default action of submit

  const popupCardWindow = document.querySelector('.popup_type_card');
  const cardNameInput = document.querySelector('.popup__input_type_card-name');
  const cardSrcInput = document.querySelector('.popup__input_type_card-src');
  const cardNames = document.querySelectorAll('.elements__title');
  const cardImages = document.querySelectorAll('.elements__img');

  closePopup();
}

// set src, alt, title to fullscreen img
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


buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', addCard);

// activate likes on click
document.querySelectorAll('.elements__like-btn').forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.classList.toggle('elements__like-btn_active'));
});

// delete cards with image on click
document.querySelectorAll('.elements__delete-btn').forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.closest('.elements__item').remove());
});

// call fullscreen image function on click
document.querySelectorAll('.elements__img-wrapper').forEach(elm => {
  elm.addEventListener('click', openFullscreenImg);
});
