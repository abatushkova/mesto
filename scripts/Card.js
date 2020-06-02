import { handleKeydown, handleCloseBtn } from './index.js';

const popupImageWindow = document.querySelector('.popup_type_img');
const popupImgElement = document.querySelector('.popup__img');
const popupImgTitle = document.querySelector('.popup__img-title');

export class Card {
  constructor(data, cardSelector) {
    this._href = data.link;
    this._src = data.link;
    this._alt = data.name;
    this._text = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like-btn')
      .addEventListener('click', this._handleLikeBtn.bind(this));
    
    this._element.querySelector('.elements__delete-btn')
      .addEventListener('click', this._handleDeleteBtn.bind(this));

    this._element.querySelector('.elements__img-wrapper')
      .addEventListener('click', this._openFullscreenImg.bind(this));
  }
  
  _togglePopup(popup) {
    popup.classList.toggle('popup_opened');

    document.addEventListener('keydown', handleKeydown);
    popup.addEventListener('click', handleCloseBtn);
  }

  _generateFullscreenImg(img) {
    popupImgElement.src = img.src;
    popupImgElement.alt = img.alt;
    popupImgTitle.textContent = img.alt;
  }

  _openFullscreenImg(evt) {
    evt.preventDefault();

    this._generateFullscreenImg(evt.target);
    this._togglePopup(popupImageWindow);
  }
  
  _handleLikeBtn() {
    this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
  }

  _handleDeleteBtn() {
    this._element.removeEventListener('click', this._openFullscreenImg);
    this._element.removeEventListener('click', this._handleLikeBtn);
    this._element.removeEventListener('click', this._handleDeleteBtn);

    this._element.querySelector('.elements__delete-btn').closest('.elements__item').remove();
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__img-wrapper').href = this._href;
    this._element.querySelector('.elements__img').src = this._src;
    this._element.querySelector('.elements__img').alt = this._alt;
    this._element.querySelector('.elements__title').textContent = this._text;

    return this._element;
  }
}
