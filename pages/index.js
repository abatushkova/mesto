// popup variables
const popupWindows = document.querySelectorAll('.popup');
const popupProfileWindow = document.querySelector('.popup_type_profile');
const popupImageWindow = document.querySelector('.popup_type_img');
// button variables
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonsLike = document.querySelectorAll('.elements__like-button');
const buttonsDelete = document.querySelectorAll('.elements__delete-button');
const buttonAdd = document.querySelector('.profile__add-button');
// profile variables
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_profile-name');
const jobInput = document.querySelector('.popup__input_type_profile-job');
const formElement = document.querySelector('.popup__form');
// image variables
const imageWindows = document.querySelectorAll('.elements__img-wrapper');
const imageItems = document.querySelectorAll('.elements__img');
const imageNames = document.querySelectorAll('.elements__title');

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup() {
  popupWindows.forEach(elm => elm.classList.remove('popup_opened'));
}

function setInputValues(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

function editProfile() {
  openPopup(popupProfileWindow);

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

// open fullscreen-img
function openFullImage(evt) {
  openPopup(popupImageWindow);

  // set src, alt, title to fullscreen-img
  document.querySelector('.popup__img').setAttribute('src', `${evt.target.src}`);
  document.querySelector('.popup__img').setAttribute('alt', `${evt.target.alt}`);
  document.querySelector('.popup__img-title').textContent = `${evt.target.alt}`;
}

buttonEdit.addEventListener('click', editProfile);
buttonsClose.forEach(elm => elm.addEventListener('click', closePopup));
formElement.addEventListener('submit', formSubmitProfile);
// buttonAdd.addEventListener('click', addImage);

// activate likes on click
buttonsLike.forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.classList.toggle('elements__like-button_active'));
});

// delete cards with image
buttonsDelete.forEach(elm => {
  elm.addEventListener('click', evt => 
  evt.target.closest('.elements__item').remove());
});

// call fullscreen-image func on click
imageWindows.forEach(elm => {
  elm.addEventListener('click', openFullImage);
});
