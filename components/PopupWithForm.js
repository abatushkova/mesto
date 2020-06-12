import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
  }

  _getInputValues() {
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _handleSubmitClick(evt) {
    evt.preventDefault();

    this._handleFormSubmit(this._getInputValues());
    this.closePopup();

    evt.target.reset();
  }

  _setEventListeners() {
    super._setEventListeners();

    this._popupSelector.addEventListener('submit', this._handleSubmitClick);  
  }

  closePopup() {
    this._popupSelector.removeEventListener('submit', this._handleSubmitClick);

    super.closePopup();
  }
}
