export default class Card {
  constructor(data, cardSelector, api, options) {
    this._cardOwner = data.owner;
    this._href = data.link;
    this._src = data.link;
    this._alt = data.name;
    this._text = data.name;
    this._id = data._id;
    this._likeList = data.likes;
    this._cardSelector = cardSelector;
    this._handleLikeBtn = this._handleLikeBtn.bind(this);
    this._handleDeleteBtn = this._handleDeleteBtn.bind(this);
    this._handleCardClick = options.cardClick;
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleDeleteConfirm = options.deleteClick;
    // this._handleLikeCount = likeCount;
    this._ownerId = options.ownerId;
    this._api = api;
    // this._ownerId = data.owner._id;
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
    this._buttonDelete = this._element.querySelector('.elements__delete-btn');
    
    if (this._cardOwner._id !== this._ownerId) {
      this._buttonDelete.remove();
    } else {
      this._buttonDelete.addEventListener('click', this._handleDeleteBtn);
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLikeBtn);
    this._imgWrapper.addEventListener('click', this._handleCardClick);
  }

  _handleLikeBtn() {
    if (!this._buttonLike.classList.contains('elements__like-btn_active')) {
      this._api.putLike('/cards/likes/' + this._id)
      .then(item => item.likes.length)
      .then(likes => {
        this._likeCount.textContent = likes++;
        this._buttonLike.classList.toggle('elements__like-btn_active');
      })
      .catch(err => console.error(err));
    } else {
      this._api.deleteLike('/cards/likes/' + this._id)
      .then(item => item.likes.length)
      .then(likes => {
        this._likeCount.textContent = likes--;
        this._buttonLike.classList.toggle('elements__like-btn_active');
      })
      .catch(err => console.error(err));
    }
  }

  _handleDeleteBtn() {
    this._handleDeleteConfirm()
    .then(response => {
      if (response) {
        this._buttonLike.removeEventListener('click', this._handleLikeBtn);
        this._buttonDelete.removeEventListener('click', this._handleDeleteBtn);
        this._imgWrapper.removeEventListener('click', this._handleCardClick);
    
        this._buttonDelete.closest('.elements__item').remove();
      }
    })
    .catch(err => console.error(err));
  }

  _setLikeActive() {
    this._likeList.forEach(item => {
      if (item._id === this._ownerId) {
        this._buttonLike.classList.add('elements__like-btn_active');
      }
    });
  }

  generateCard() {
    this._getTemplate();
    this._getComponents();
    this._getDeleteBtnComponent();
    this._setLikeActive();
    this._setEventListeners();

    this._imgWrapper.href = this._href;
    this._imgElement.src = this._src;
    this._imgElement.alt = this._alt;
    this._imgTitle.textContent = this._text;
    this._likeCount.textContent = this._likeList.length;

    return this._element;
  }
}
