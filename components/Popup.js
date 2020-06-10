export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popupSelector.classList.remove('popup_opened');

      document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
  }

  _setEventListeners() {
    this._popupSelector.addEventListener('click', this.closePopup.bind(this));

    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');

    this._setEventListeners();
  }

  closePopup(evt) {
    if (
      evt.target.classList.contains('popup__close-btn')
      || evt.target.classList.contains('popup_opened')
    ) {
      this._popupSelector.classList.remove('popup_opened');
    }

    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
}
