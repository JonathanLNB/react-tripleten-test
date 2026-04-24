import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from './api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth/auth.js';
import ProtectedRoute from "../auth/ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(false);

const history = useHistory();
  React.useEffect(() => {
    api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.log(err))
  }, []);



  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState('');
  React.useEffect(() => {
  let token = localStorage.getItem('jwt');
  if (token) {
      auth.checkToken(token).then((res) => {
        if (res) {
            setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        }
        else {
          localStorage.removeItem('jwt');
        }
      })
        .catch(err => console.log(err));
    }
  }, []);

const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [email, setEmail] = React.useState('');
function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

 function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);


    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  }



  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })


      .catch((err) => console.log(err));
  }



  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

      setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  }

function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {

    setCards(cards => cards.filter((c) => c._id !== card._id));
    })

      .catch((err) => console.log(err));
  }

function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard).then((newCardFull) => {
      setCards([newCardFull, ...cards]);

      closeAllPopups();
    })
      .catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
  auth.register(email, password)
      .then((res) => {
        if (res.data._id) {
          setTooltipStatus('success');
          setIsInfoToolTipOpen(true);
        }
      })
    .catch((err) => {
        console.log(err);
      });
  }

  return (
<CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} setIsLoggedIn={setIsLoggedIn} />
        <Switch>

          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route exact path="/signup">
            <Register onRegister={onRegister}/>
          </Route>
          <Route exact path="/signin">
            <Login setIsLoggedIn={setIsLoggedIn}/>
          </Route>

        </Switch>


        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups}/>
        <PopupWithForm title="Are you sure?" name="remove-card" buttonText="Yes"/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} setCurrentUser={setCurrentUser} onClose={closeAllPopups}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={tooltipStatus}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
