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

  setUserAvatar(user) {
    this._img.src = user.avatar;
  }

  setUserInfo(user) {
    this._img.alt = user.name;
    this._name.textContent = user.name;
    this._info.textContent = user.about;
  }
}
