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
      console.log(response);
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    })
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

  deleteCard(cardId) {
    return this._fetch('/cards/' + cardId, {
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
