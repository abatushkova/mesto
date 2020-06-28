import {
  profileAvatar,
  profileName,
  profileInfo,
  inputProfileName, 
  inputProfileInfo
} from '../utils/constants.js';

export default class UserInfo {
  constructor() {
    this._name = profileName;
    this._info = profileInfo;
    this._img = profileAvatar;
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
