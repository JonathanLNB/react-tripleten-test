import React from "react";
import { Link } from "react-router-dom";

function Register({ isSaving, onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Sign up</h3>
          <label className="auth-form__input">
            <input type="text" name="email" id="email"
                   className="auth-form__textfield" placeholder="Email"
                   onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
                   className="auth-form__textfield" placeholder="Password"
                   onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit" disabled={isSaving}> {isSaving ? 'Signing up...' : 'Sign up'}</button>
          <p className="auth-form__text">Already a member? {" "} <Link className="auth-form__link" to="/signin">Log in
            here!</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
