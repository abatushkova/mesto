import Popup from './Popup.js';

export default class PopupWithImg extends Popup {
  constructor(popup, options) {
    super(popup);
    this._imgElement = options.imgElement;
    this._imgTitle = options.imgTitle;
  }

  open(evt) {
    evt.preventDefault();

    this._imgElement.src = evt.target.src;
    this._imgElement.alt = evt.target.alt;
    this._imgTitle.textContent = evt.target.alt;

    super.open();
  }
}
