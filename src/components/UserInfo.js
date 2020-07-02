export default class UserInfo {
  constructor(options) {
    this._name = options.userName;
    this._info = options.userInfo;
    this._img = options.userAvatar;
    this._inputName = options.inputName;
    this._inputInfo = options.inputInfo;
  }

  getUserInfo() {
    this._inputName.value = this._name.textContent;
    this._inputInfo.value = this._info.textContent;
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
