import { inputProfileName, inputProfileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({ userName, userInfo, userImg }) {
    this._name = userName;
    this._info = userInfo;
    this._img = userImg;
  }

  getUserInfo() {
    inputProfileName.value = this._name.textContent;
    inputProfileInfo.value = this._info.textContent;
  }

  setUserAvatar(data) {
    this._img.src = data.avatar;
  }

  setUserInfo(data) {
    this._img.alt = data.name;
    this._name.textContent = data.name;
    this._info.textContent = data.about;
  }
}
