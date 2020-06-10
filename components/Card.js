export default class Card {
  constructor(item, cardSelector, handleCardClick) {
    this._href = item.link;
    this._src = item.link;
    this._alt = item.name;
    this._text = item.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      .addEventListener('click', this._handleCardClick.bind(this));
  }

  _handleLikeBtn() {
    this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
  }

  _handleDeleteBtn() {
    this._element.removeEventListener('click', this._handleCardClick);
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
