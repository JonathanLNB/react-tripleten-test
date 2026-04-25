import React from 'react';

import '../blocks/login/login.css';
import * as auth from "../services/auth";
import { useHistory } from "react-router-dom";

function Login ({onLogin}){
  const [email, setEmail] = React.useState('');
  const [password, setpassword] = React.useState('');

  let history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Log in</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Password"
              onChange={e => setpassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login;
