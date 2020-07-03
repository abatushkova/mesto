import Popup from './Popup.js';

export default class PopupWithImg extends Popup {
  constructor(popup, options) {
    super(popup);
    this._imgElement = options.imgElement;
    this._imgTitle = options.imgTitle;
  }

  open(data) {
    data.evt.preventDefault();

    this._imgElement.src = data.link;
    this._imgElement.alt = data.name;
    this._imgTitle.textContent = data.name;

    super.open();
  }
}
