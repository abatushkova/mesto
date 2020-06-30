export default class Card {
  constructor(data, cardSelector, api, options) {
    this._href = data.link;
    this._src = data.link;
    this._alt = data.name;
    this._text = data.name;
    this._cardId = data._id;
    this._likeList = data.likes;
    this._cardSelector = cardSelector;
    this._api = api;
    this._cardUserId = options.cardUserId;
    this._initialUserId = options.initialUserId;
    this._renderConfirmPopup = options.renderConfirmPopup;
    this._handleCardClick = options.handleCardClick;
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
    this._imgWrapper = this._element.querySelector('.elements__img-wrapper');
    this._imgElement = this._element.querySelector('.elements__img');
    this._imgTitle = this._element.querySelector('.elements__title');
    this._likeCount = this._element.querySelector('.elements__like-count');
  }

  _getDeleteBtnComponent() {
    if (this._cardUserId === this._initialUserId) {
      this._buttonDelete = this._element.querySelector('.elements__delete-btn');

      this._buttonDelete.classList.add('is-visible');

      this._buttonDelete.addEventListener('click', this._handleDeleteBtn);
    }
  }
  
  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLikeBtn);
    this._imgWrapper.addEventListener('click', this._handleCardClick);
  }

  _handleLikeBtn() {
    if (!this._buttonLike.classList.contains('elements__like-btn_active')) {
      this._api.putLike('/cards/likes/' + this._cardId)
      .then(item => item.likes.length)
      .then(likes => {
        this._likeCount.textContent = likes++;
        this._buttonLike.classList.toggle('elements__like-btn_active');
      })
      .catch(err => console.error(err));
    } else {
      this._api.deleteLike('/cards/likes/' + this._cardId)
      .then(item => item.likes.length)
      .then(likes => {
        this._likeCount.textContent = likes--;
        this._buttonLike.classList.toggle('elements__like-btn_active');
      })
      .catch(err => console.error(err));
    }
  }

  _handleConfirmBtn() {
    this._api.deleteCard(this._cardId)
    .then(() => {
      this._buttonLike.removeEventListener('click', this._handleLikeBtn);
      this._buttonDelete.removeEventListener('click', this._handleDeleteBtn);
      this._imgWrapper.removeEventListener('click', this._handleCardClick);

      this._buttonDelete.closest('.elements__item').remove();
    })
    .catch(err => console.error(err));
  }

  _handleDeleteBtn() {
    this._renderConfirmPopup(this._handleConfirmBtn.bind(this))
  }

  _setLikeBtnActive() {
    this._likeList.forEach(item => {
      if (item._id === this._initialUserId) {
        this._buttonLike.classList.add('elements__like-btn_active');
      }
    });
  }

  generateCard() {
    this._getTemplate();
    this._getComponents();
    this._getDeleteBtnComponent();
    this._setLikeBtnActive();
    this._setEventListeners();

    this._imgWrapper.href = this._href;
    this._imgElement.src = this._src;
    this._imgElement.alt = this._alt;
    this._imgTitle.textContent = this._text;
    this._likeCount.textContent = this._likeList.length;

    return this._element;
  }
}
