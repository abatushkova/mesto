import Card from '../components/Card.js';
// import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import {
  initialCards,
  cardContainer,
  popupImageWindow
} from '../utils/constants.js';


// const cardValidator = new FormValidator(formArgs, '.popup_type_card');
// const profileValidator = new FormValidator(formArgs, '.popup_type_profile');

// export function handleKeydown(evt) {
//   if (evt.key === 'Escape') {
//     popupWindows.forEach((popup) => {
//       popup.classList.remove('popup_opened');

//       document.removeEventListener('keydown', handleKeydown);
//     });
//   }
// }

// export function handleCloseBtn(evt) {
//   if (
//     evt.target.classList.contains('popup__close-btn') 
//     || evt.target.classList.contains('popup_opened')
//   ) {
//     evt.currentTarget.classList.remove('popup_opened');

//     document.removeEventListener('click', handleCloseBtn);
//   }
// }

// function togglePopup(popup) {
//   popup.classList.toggle('popup_opened');

//   document.addEventListener('keydown', handleKeydown);
//   popup.addEventListener('click', handleCloseBtn);
// }

// function addUserCard(card, container) {
//   container.prepend(card);
// }

// function formSubmitCard(evt) {
//   evt.preventDefault(); // prevent default action on submit
  
//   const inputValues = {
//     name: inputCardName.value,
//     link: inputCardSrc.value
//   };
//   const card = new Card(inputValues, '#card');
//   const cardElement = card.generateCard();

//   addUserCard(cardElement, cardContainer);
//   togglePopup(popupCardWindow);

//   evt.target.reset(); // clean input value after submit
// }

// function renderCardPopup() {
//   togglePopup(popupCardWindow);

//   popupCardWindow.addEventListener('submit', formSubmitCard);
// }

// function formSubmitProfile(evt) {
//   evt.preventDefault(); // prevent default action on submit

//   profileAvatar.alt = inputProfileName.value;
//   profileName.textContent = inputProfileName.value;
//   profileInfo.textContent = inputProfileInfo.value;

//   togglePopup(popupProfileWindow);

//   evt.target.reset(); // clean input value after submit
// }

// function setInitialInputValues() {
//   inputProfileName.value = profileName.textContent;
//   inputProfileInfo.value = profileInfo.textContent;
// }

// function renderProfilePopup() {
//   setInitialInputValues();
//   togglePopup(popupProfileWindow);

//   popupProfileWindow.addEventListener('submit', formSubmitProfile);
// }

// buttonAdd.addEventListener('click', renderCardPopup);
// buttonEdit.addEventListener('click', renderProfilePopup);

// cardValidator.enableValidation();
// profileValidator.enableValidation();

// initialCards.forEach((item) => {
//   const card = new Card(item, '#card');
//   const cardElement = card.generateCard();

//   cardContainer.append(cardElement);
// });


const handleCardClick = (evt) => {
  const popupImg = new PopupWithImg(popupImageWindow);

  popupImg.openPopup(evt);
}

const cardList = new Section({
  items: initialCards,
  render: (item) => {
    const card = new Card(item, '#card', handleCardClick);

    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
}, cardContainer);

cardList.renderItems();


