import Popup from './Popup.js';
import { popupBtnConfirm } from '../utils/constants.js';

export default class PopupWithConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._generateHandleConfirmBtn = this._generateHandleConfirmBtn.bind(this);
  }

  _generateHandleConfirmBtn(callback) {
    const that = this;

    return function() {
      if (callback !== undefined) {
        callback();
      }
      that.close();
    };
  }

  _setEventListeners(callback) {
    super._setEventListeners();

    this._handleConfirmBtn = this._generateHandleConfirmBtn(callback);

    popupBtnConfirm.addEventListener('click', this._handleConfirmBtn);
  }

  open(callback) {
    this._setEventListeners(callback);

    this._popup.classList.add('popup_opened');
  }

  close() {
    popupBtnConfirm.removeEventListener('click', this._handleConfirmBtn);

    super.close();
  }
}
