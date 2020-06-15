export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._href = data.link;
    this._src = data.link;
    this._alt = data.name;
    this._text = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleLikeBtn = this._handleLikeBtn.bind(this);
    this._handleDeleteBtn = this._handleDeleteBtn.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    this._element = cardElement;
  }

  _getComponents() {
    this._buttonLike = this._element.querySelector('.elements__like-btn');
    this._buttonDelete = this._element.querySelector('.elements__delete-btn');
    this._imgWrapper = this._element.querySelector('.elements__img-wrapper');
    this._imgElement = this._element.querySelector('.elements__img');
    this._imgTitle = this._element.querySelector('.elements__title');
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLikeBtn);
    this._buttonDelete.addEventListener('click', this._handleDeleteBtn);
    this._imgWrapper.addEventListener('click', this._handleCardClick);
  }

  _handleLikeBtn() {
    this._buttonLike.classList.toggle('elements__like-btn_active');
  }

  _handleDeleteBtn() {
    this._buttonLike.removeEventListener('click', this._handleLikeBtn);
    this._buttonDelete.removeEventListener('click', this._handleDeleteBtn);
    this._imgWrapper.removeEventListener('click', this._handleCardClick);

    this._buttonDelete.closest('.elements__item').remove();
  }

  generateCard() {
    this._getTemplate();
    this._getComponents();
    this._setEventListeners();

    this._imgWrapper.href = this._href;
    this._imgElement.src = this._src;
    this._imgElement.alt = this._alt;
    this._imgTitle.textContent = this._text;

    return this._element;
  }
}
