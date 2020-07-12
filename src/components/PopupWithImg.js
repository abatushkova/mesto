import Popup from './Popup.js';

export default class PopupWithImg extends Popup {
  constructor(popup, options) {
    super(popup);
    this._imgElement = options.imgElement;
    this._imgTitle = options.imgTitle;
  }

  open(cardLink, cardName) {
    this._imgElement.src = cardLink;
    this._imgElement.alt = cardName;
    this._imgTitle.textContent = cardName;

    super.open();
  }
}
