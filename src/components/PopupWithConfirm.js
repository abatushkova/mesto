import Popup from './Popup.js';
import { popupBtnConfirm } from '../utils/constants.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmBtnClick) {
    super(popupSelector);
    this._handleBtnConfirm = this._handleBtnConfirm.bind(this);
    this._handleConfirmBtnClick = handleConfirmBtnClick
    this._handleConfirmBtnClick = this._handleConfirmBtnClick.bind(this);
  }

  _handleBtnConfirm() {
    // this._handleConfirmBtnClick();
    this.close();
  }

  _setEventListeners() {
    super._setEventListeners();

    popupBtnConfirm.addEventListener('click', this._handleBtnConfirm);
  }

  close() {
    popupBtnConfirm.removeEventListener('click', this._handleBtnConfirm);

    super.close();

    return true;
  }
}
