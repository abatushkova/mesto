const popupWindow = document.querySelector('.popup');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const buttonLike = document.querySelectorAll('.elements__like-button');
const buttonDelete = document.querySelectorAll('.elements__delete-button');
const buttonAdd = document.querySelector('.profile__add-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_profile-name');
const jobInput = document.querySelector('.popup__input_type_profile-job');
const formElement = document.querySelector('.popup__form');

function openPopup() {
  popupWindow.classList.add('popup_opened');
}

function closePopup() {
  popupWindow.classList.remove('popup_opened');
}

function setInputValues(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

// function togglePopup() {
//   if (!popupWindow.classList.contains('popup_opened')) {
//     popupWindow.classList.add('popup_opened');

//     setInputValues(nameProfile.textContent, jobProfile.textContent);
//   } else {
//     popupWindow.classList.remove('popup_opened');
//   }
// }

function editProfile() {
  openPopup();
  setInputValues(nameProfile.textContent, jobProfile.textContent);
}

function formSubmitProfile (evt) {
  evt.preventDefault(); // prevent default action of submit
  
  // set new profile name if it's different 
  if (nameProfile.textContent !== nameInput.value) {
    nameProfile.textContent = nameInput.value;

    // set profile name as avatar alt
    document.querySelector('.profile__avatar').setAttribute('alt', `${nameInput.value}.`);
  }
  
  // set new profile job if it's different
  if (jobProfile.textContent !== jobInput.value) {
    jobProfile.textContent = jobInput.value;
  }
  
  closePopup();
}

buttonEdit.addEventListener('click', editProfile);
buttonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitProfile);
buttonAdd.addEventListener('click', openPopup);

// activate likes on click
buttonLike.forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.classList.toggle('elements__like-button_active'));
});

// delete element with image
buttonDelete.forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.closest('.elements__item').remove());
});
