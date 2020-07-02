export default class Api  {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(url, params) {
    return fetch(this._baseUrl + url, {
      ...params,
      headers: this._headers,
      body: JSON.stringify(params.body)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
  }

  getInitialUserInfo() {
    return this._fetch('/users/me', {
      method: 'GET'
    });
  }

  getInitialCards() {
    return this._fetch('/cards', {
      method: 'GET'
    });
  }

  updateUserInfo(user) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: {
        name: user.name,
        about: user.about
      }
    });
  }

  updateUserAvatar(user) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      body: {
        avatar: user.avatar
      }
    });
  }

  postUserCard(card) {
    return this._fetch('/cards', {
      method: 'POST',
      body: {
        name: card.title,
        link: card.src
      }
    });
  }

  deleteCard(cardId) {
    return this._fetch('/cards/' + cardId, {
      method: 'DELETE'
    });
  }

  putLike(cardId) {
    return this._fetch('/cards/likes/' + cardId, {
      method: 'PUT'
    });
  }

  deleteLike(cardId) {
    return this._fetch('/cards/likes/' + cardId, {
      method: 'DELETE'
    });
  }
}
