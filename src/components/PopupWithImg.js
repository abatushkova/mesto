import Popup from './Popup.js';
import {
  popupImgElement,
  popupImgTitle
} from '../utils/constants.js';

export default class PopupWithImg extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    evt.preventDefault();

    popupImgElement.src = evt.target.src;
    popupImgElement.alt = evt.target.alt;
    popupImgTitle.textContent = evt.target.alt;

    super.open();
  }
}
