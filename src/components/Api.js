export default class Api  {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(url, params) {
    params.headers = this._headers;

    if (params.body) {
      params.headers['Content-Type'] = 'application/json';
      params.body = JSON.stringify(params.body);
    }

    return fetch(this._baseUrl + url, params)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch(error => {
      console.error(error);
    });
  }

  getInitialUserInfo(url) {
    return this._fetch(url, {
      method: 'GET'
    });
  }

  getInitialCards(url) {
    return this._fetch(url, {
      method: 'GET'
    });
  }

  updateUserInfo(url, user) {
    return this._fetch(url, {
      method: 'PATCH',
      body: {
        name: user.name,
        about: user.about
      }
    });
  }

  updateUserAvatar(url, user) {
    return this._fetch(url, {
      method: 'PATCH',
      body: {
        avatar: user.avatar
      }
    });
  }

  postUserCard(url, card) {
    return this._fetch(url, {
      method: 'POST',
      body: {
        name: card.title,
        link: card.src
      }
    });
  }

  deleteCard(url) {
    return this._fetch(url, {
      method: 'DELETE'
    });
  }

  putLike(url) {
    return this._fetch(url, {
      method: 'PUT'
    });
  }

  deleteLike(url) {
    return this._fetch(url, {
      method: 'DELETE'
    });
  }
}
