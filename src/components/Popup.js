export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleBtnClose(evt) {
    if (
      evt.target.classList.contains('popup__close-btn')
      || evt.target.classList.contains('popup_opened')
    ) {
      this.closePopup();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleBtnClose);
  }

  openPopup() {
    this._setEventListeners();

    this._popupSelector.classList.add('popup_opened');
  }

  closePopup() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleBtnClose);

    this._popupSelector.classList.remove('popup_opened');
  }
}
