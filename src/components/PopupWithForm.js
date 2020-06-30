import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._buttonSubmit = popup.querySelector('.popup__submit-btn');
  }

  _renderLoading(isLoading, text) {
    this._buttonSubmit.textContent = isLoading
      ? 'Загрузка...' 
      : text;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // _handleSubmitBtn(evt) {
  //   evt.preventDefault();

  //   this._handleFormSubmit(this._getInputValues())
  //   this.close();

  //   evt.target.reset();
  // }

  // _setEventListeners() {
  //   super._setEventListeners();

  //   this._popup.addEventListener('submit', this._handleSubmitBtn);  
  // }

  _generateHandleSubmitBtn(callback) {
    const that = this;
    const buttonSubmitText = this._buttonSubmit.textContent;
    
    return function(evt) {
      evt.preventDefault();
      that._renderLoading(true);

      if (callback !== undefined) {
        that._callback(that._getInputValues())
        .then(() => {
          that.close();
          evt.target.reset();
        })
        .catch(err => console.error(err))
        .finally(() => that._renderLoading(false, buttonSubmitText))
      }
      // that._renderLoading(false, buttonSubmitText);
    };
  }

  _setEventListeners(callback) {
    super._setEventListeners();

    this._handleSubmitBtn = this._generateHandleSubmitBtn(callback);

    this._popup.addEventListener('submit', this._handleSubmitBtn.bind(this));  
  }

  open(callback) {
    this._setEventListeners(callback);

    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.removeEventListener('submit', this._handleSubmitBtn);

    super.close();
  }
}
