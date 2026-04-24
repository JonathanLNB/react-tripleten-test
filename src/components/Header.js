import React from 'react';
import { Route, Link, useHistory } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header ({ setIsLoggedIn }) {

  const history = useHistory();
  function handleSignOut(){
    onSignOut();
  }

  function onSignOut() {
    setIsLoggedIn(false);
    history.push('/signup');
  }
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Around The U.S. Logo" className="logo header__logo" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user"></p>
          <button className="header__logout" onClick={handleSignOut}>Sign out</button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">Sign in</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">Sign up</Link>
      </Route>
    </header>
  )
}

export default Header;
