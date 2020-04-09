const popupWindow = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const buttonEdit = document.querySelector('.button_type_edit');
const buttonClose = document.querySelector('.button_type_close');

buttonEdit.addEventListener('click', () => {
  popupWindow.classList.add('popup_opened');
});

buttonClose.addEventListener('click', () => {
  popupWindow.classList.remove('popup_opened');
});

