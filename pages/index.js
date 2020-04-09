const popupWindow = document.querySelector('.popup');
const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelector('.button_type_close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

function setInputValues(name, job) {
  nameInput.value = name;
  jobInput.value = job;
}

function openPopup() {
  popupWindow.classList.add('popup_opened');

  setInputValues(nameProfile.textContent, jobProfile.textContent);
}

function closePopup() {
  popupWindow.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);

const formElement = document.querySelector('#popup-form');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let avatarAltText = document.querySelector('.profile__avatar');

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    avatarAltText.setAttribute('alt', `${nameInput.value}.`);

    closePopup();
  }

formElement.addEventListener('submit', formSubmitHandler);
