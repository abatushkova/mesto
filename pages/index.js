const popupWindow = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button_type_edit');
const buttonClose = document.querySelector('.popup__close-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_profile-name');
const jobInput = document.querySelector('.popup__input_type_profile-job');
const formElement = document.querySelector('.popup__form');

function setInputValues(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

function togglePopup() {
  if (!popupWindow.classList.contains('popup_opened')) {
    popupWindow.classList.add('popup_opened');

    setInputValues(nameProfile.textContent, jobProfile.textContent);
  } else {
    popupWindow.classList.remove('popup_opened');
  }
}

function formSubmitHandler (evt) {
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
  
  togglePopup();
}

buttonEdit.addEventListener('click', togglePopup);
buttonClose.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
