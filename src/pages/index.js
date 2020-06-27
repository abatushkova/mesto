import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
// import Section from '../components/Section.js';
import PopupWithImg from '../components/PopupWithImg.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonAdd,
  buttonEdit,
  buttonSubmit,
  buttonUpdateAv,
  formArgs,
  // inputProfileName,
  // inputProfileInfo,
  profileAvatar,
  profileName,
  profileInfo,
  // initialCards,
  cardContainer,
  popupImageWindow,
  popupProfileWindow,
  popupCardWindow,
  popupConfirmWindow,
  popupAvatarWindow
} from '../utils/constants.js';

const cardValidator = new FormValidator(formArgs, '.popup_type_card');
const profileValidator = new FormValidator(formArgs, '.popup_type_profile');
const avatarValidator = new FormValidator(formArgs, '.popup_type_avatar');
const imgPopup = new PopupWithImg(popupImageWindow);

const profile = new UserInfo({
  userName: profileName,
  userInfo: profileInfo,
  userImg: profileAvatar
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'bd0f2499-7585-4f83-9366-da3fa3857f94'
  }
});
// likeCount: handleLikeCount,
// likeActive: setLikeActive

// function handlePutLike(id) {
//   return api.putLike('/cards/likes/' + id)
//   .catch(err => console.error(err));
// }

// function handleDeleteLike(id) {
//   return api.deleteLike('/cards/likes/' + id)
//   .catch(err => console.error(err));
// }

// function handleLikeCount() {

// }
// const id = api.getOwnerId('/users/me')
//   .then(owner => showOwnerId(owner._id))
//   .catch(err => console.error(err)); 

let ownerId;

api.getOwnerId('/users/me')
.then(user => {
  ownerId = user._id;
})
.catch(err => console.error(err)); 


// console.log(ownerId);

// api.getOwnerId('/users/me')
// .then(owner => {
//   if (this._ownerId !== owner._id) {
//     this._buttonDelete.remove();
//   }
// })
// .catch(err => console.error(err));

// const renderOwnerId = () => {
//   api.getOwnerId('/users/me')
//   .then(owner => owner._id)
//   .catch(renderError);
// }

// console.log(renderOwnerId);


function renderLoading(isLoading, text) {
  if (isLoading) {
    (text === 'Сохранить') ?
      buttonSubmit.textContent = 'Сохранение...' :
      buttonSubmit.textContent = 'Создание...';
  } else {
    buttonSubmit.textContent = text;
  }
}

function renderError(err) {
  console.error(err);
};

const renderUserInfo = (user) => {
  profile.setUserInfo(user);
  profile.setUserAvatar(user);
};

api.getInitialUserInfo('/users/me')
.then(renderUserInfo)
.catch(renderError);

const handleCardClick = (evt) => {
  imgPopup.open(evt);
};

const handleConfirmClick = (item) => {
  api.deleteCard('/cards' + item._id);
}

const confirmPopup = new PopupWithConfirm(popupConfirmWindow, handleConfirmClick);

const handleDeleteBtnClick = (card) => {
  confirmPopup.open();

  api.deleteCard('/cards/' + card._id)
  handleConfirmBtnClick();
};


const renderInitialCards = (cardList) => {
  cardList.forEach((item) => {
    const card = new Card(item, '#card', api, {
      cardClick: handleCardClick,
      deleteClick: handleDeleteBtnClick,
      // likeCount: handleLikeCount,
      ownerId: ownerId,
    });
    const cardElement = card.generateCard();

    cardContainer.append(cardElement);
  })
};

api.getInitialCards('/cards')
.then(renderInitialCards)
.catch(renderError);

const addUserCard = (card, container) => {
  container.prepend(card);
};

const handleCardFormSubmit = (formValues) => {
  const inputValues = {
    name: formValues.title,
    link: formValues.src,
    likes: []
  };

  // const userCard = new Card(inputValues, '#card', api, {
  //   cardClick: handleCardClick,
  //   deleteClick: handleDeleteBtnClick,
  //   ownerId: ownerId,

  // });
  // const cardElement = userCard.generateCard();

  renderLoading(true, 'Создать');
  // addUserCard(cardElement, cardContainer);

  api.postUserCard('/cards', formValues)
  .then(card => {
    const userCard = new Card(card, '#card', api, {
      cardClick: handleCardClick,
      deleteClick: handleDeleteBtnClick,
      ownerId: ownerId,
  
    });
    const cardElement = userCard.generateCard();
  
    addUserCard(cardElement, cardContainer);
  })
  .catch(renderError)
  .finally(() => renderLoading(false, 'Создать'));
};

const cardPopup = new PopupWithForm(
  popupCardWindow, handleCardFormSubmit
);

const renderCardPopup = () => {
  cardPopup.open();
};

const handleProfileFormSubmit = (formValues) => {
  renderLoading(true, 'Сохранить');

  profile.setUserInfo(formValues);

  api.updateUserInfo('/users/me', formValues)
  .catch(renderError)
  .finally(() => renderLoading(false, 'Сохранить'));
};

const profilePopup = new PopupWithForm(
  popupProfileWindow, handleProfileFormSubmit
);

const renderProfilePopup = () => {
  profile.getUserInfo();

  profilePopup.open();
};

const handleAvatarFormSubmit = (formValues) => {
  renderLoading(true, 'Сохранить');

  profile.setUserAvatar(formValues);

  api.updateUserAvatar('/users/me/avatar', formValues)
  .catch(renderError)
  .finally(() => renderLoading(false, 'Сохранить'));
}

const avatarPopup = new PopupWithForm(popupAvatarWindow, handleAvatarFormSubmit);

const renderAvatarPopup = () => {
  avatarPopup.open();
}

buttonAdd.addEventListener('click', renderCardPopup);
buttonEdit.addEventListener('click', renderProfilePopup);
buttonUpdateAv.addEventListener('click', renderAvatarPopup);

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();
