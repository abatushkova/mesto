export default class UserInfo {
  constructor({ userName, userInfo, userImg }) {
    this._name = userName;
    this._info = userInfo;
    this._img = userImg;
  }

  getUserInfo() {
    this._element = {
      name: this._name.textContent,
      info: this._info.textContent
    }

    return this._element;
  }

  setUserInfo(data) {
    this._img.alt = data.name;
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}
