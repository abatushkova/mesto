export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleBtnClose(evt) {
    if (
      evt.target.classList.contains('popup__close-btn')
      || evt.target.classList.contains('popup_opened')
    ) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleBtnClose);
  }

  open() {
    this._setEventListeners();

    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleBtnClose);

    this._popupElement.classList.remove('popup_opened');
  }
}
