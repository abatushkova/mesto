export default class Card {
  constructor(card, cardSelector, options) {
    this._src = card.link;
    this._name = card.name;
    this._cardId = card._id;
    this._cardUserId = card.owner._id;
    this._likeList = card.likes;
    this._cardSelector = cardSelector;
    this._api = options.api;
    this._initialUserId = options.initialUserId;
    this._renderConfirmPopup = options.renderConfirmPopup;
    this._renderImgPopup = options.renderImgPopup;
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
    this._imgElement = this._element.querySelector('.elements__img');
    this._imgTitle = this._element.querySelector('.elements__title');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
  }

  _getDeleteBtnComponent() {
    if (this._cardUserId === this._initialUserId) {
      this._buttonDelete = this._element.querySelector('.elements__delete-btn');

      this._buttonDelete.classList.add('is-visible');

      this._buttonDelete.addEventListener('click', this._handleDeleteBtn);
    }
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', this._handleCardClick);
    this._buttonLike.addEventListener('click', this._handleLikeBtn);
  }

  _handleCardClick() {
    this._renderImgPopup(this._src, this._name);
  }

  _handleLikeBtn() {
    const method = (!this._buttonLike.classList.contains('elements__like-btn_active'))
      ? 'putLike'
      : 'deleteLike';
    console.log(method);
    this._handleLikeCounter(method);
    // if (!this._buttonLike.classList.contains('elements__like-btn_active')) {
    //   this._api.putLike(this._cardId)
    //   .then(item => item.likes.length)
    //   .then(this._handleLikeCounter.bind(this))
    //   .catch(err => console.error(err));
    // } else {
    //   this._api.deleteLike(this._cardId)
    //   .then(item => item.likes.length)
    //   .then(this._handleLikeCounter.bind(this))
    //   .catch(err => console.error(err));
    // }
  }

  _handleLikeCounter(method) {
    this._api.method(this._cardId)
    .then(item => item.likes.length)
    .then(this._handleLikeCounter.bind(this))
    .catch(err => console.error(err));

    // this._likeCounter.textContent = likes;
    // this._buttonLike.classList.toggle('elements__like-btn_active');
  }

  _handleDeleteBtn() {
    this._renderConfirmPopup(this._handleConfirmBtn.bind(this))
  }

  _handleConfirmBtn() {
    this._api.deleteCard(this._cardId)
    .then(() => {
      this._imgElement.removeEventListener('click', this._handleCardClick);
      this._buttonLike.removeEventListener('click', this._handleLikeBtn);
      this._buttonDelete.removeEventListener('click', this._handleDeleteBtn);

      this._element.remove();
    })  
    .catch(err => console.error(err));
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

    this._imgElement.src = this._src;
    this._imgElement.alt = this._name;
    this._imgTitle.textContent = this._name;
    this._likeCounter.textContent = this._likeList.length;

    return this._element;
  }
}
