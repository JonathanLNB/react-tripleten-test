class AuthApi {
  constructor({ address }) {
    this._address = address;
  }

  register = (email, password) => {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((res) => {
        return res;
      });
  };

  login = (email, password) => {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("email", email);
        return data;
      });
  };
  checkToken = (token) => {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        return res;
      });
  };
}

const authApi = new AuthApi({
  address: process.env.REACT_APP_AUTH_API_URL
});

export default authApi;

