import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import api from "../services/api";
import authApi from "../services/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "../auth/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      authApi.checkToken(token).then((checkTokenResponse) => {
        console.log("checkTokenResponse", checkTokenResponse);
        if (checkTokenResponse) {
          setIsLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      }).catch(err => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setCardToDelete(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleLoginUser(email, password) {
    authApi.login(email, password).then((loginResponse) => {
      if (loginResponse.token) {
        setIsLoggedIn(true);
        history.push("/");
      }
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsDeletePopupOpen(true);
  }

  function handleConfirmDelete(e) {
    e.preventDefault();
    api.removeCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((card) => card._id !== cardToDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard).then((newCardFull) => {
      setCards([newCardFull, ...cards]);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api.setUserAvatar(avatarUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function onRegister({ email, password }) {
    authApi.register(email, password)
      .then((res) => {
        if (res.data._id) {
          setTooltipStatus("success");
          setIsInfoToolTipOpen(true);
        }
      }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header setIsLoggedIn={setIsLoggedIn} />
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
            <Register onRegister={onRegister} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLoginUser} />
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
        <PopupWithForm
          title="Are you sure?"
          name="remove-card"
          buttonText="Yes"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmDelete}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}
                         onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={tooltipStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
