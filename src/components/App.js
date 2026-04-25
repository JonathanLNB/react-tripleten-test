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
import { ALERT_MESSAGES } from "../utils/constants";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token) {
      authApi.checkToken(token).then((checkTokenResponse) => {
        if (checkTokenResponse) {
          setIsLoggedIn(true);
          history.push("/");
        } else {
          localStorage.removeItem("jwt");
        }
      }).catch(err => {
        showMessage(false, ALERT_MESSAGES.checkTokenError);
        console.log(err);
      });
    }
  }, [history]);

  React.useEffect(() => {
    api.getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch(err => {
        showMessage(false, ALERT_MESSAGES.getAppInfoError);
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
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
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsSaving(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    setIsSaving(true);
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
      showMessage(true, ALERT_MESSAGES.updateProfileSuccess);
    }).catch((err) => {
      showMessage(false, ALERT_MESSAGES.updateProfileError);
      console.log(err);
    });
  }

  function handleLoginUser(email, password) {
    setIsSaving(true);
    authApi.login(email, password).then((loginResponse) => {
      if (loginResponse.token) {
        setIsLoggedIn(true);
        setIsSaving(false);
        history.push("/");
      } else {
        showMessage(false, ALERT_MESSAGES.loginError);
        console.log(loginResponse);
      }
    });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
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

  function handleConfirmDelete(event) {
    event.preventDefault();
    setIsSaving(true);
    api.removeCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((card) => card._id !== cardToDelete._id)
        );
        closeAllPopups();
        showMessage(true, ALERT_MESSAGES.deleteCardSuccess);
      })
      .catch((err) => {
        showMessage(false, ALERT_MESSAGES.deleteCardError);
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsSaving(true);
    api.addCard(newCard).then((newCardFull) => {
      setCards([newCardFull, ...cards]);
      closeAllPopups();
      showMessage(true, ALERT_MESSAGES.addCardSuccess);
    }).catch((err) => {
      showMessage(false, ALERT_MESSAGES.addCardError);
      console.log(err);
    });
  }

  function handleUpdateAvatar(avatarUpdate) {
    setIsSaving(true);
    api.setUserAvatar(avatarUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
      showMessage(true, ALERT_MESSAGES.updateAvatarSuccess);
    }).catch((err) => {
      showMessage(false, ALERT_MESSAGES.updateAvatarError);
      console.log(err);
    });
  }

  function onRegister({ email, password }) {
    setIsSaving(true);
    authApi.register(email, password)
      .then((userResponse) => {
        if (userResponse.data._id) {
          history.push("/signin");
          showMessage(true, ALERT_MESSAGES.registerSuccess);
        }
      }).catch((err) => {
      showMessage(false, ALERT_MESSAGES.registerError);
      console.log(err);
    });
  }

  function showMessage(success, message) {
    setTooltipStatus(success ? "success" : "error");
    setAlertMessage(message);
    setIsInfoToolTipOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header onSignOut={handleLogout} />
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
            <Register isSaving={isSaving} onRegister={onRegister} />
          </Route>
          <Route exact path="/signin">
            <Login isSaving={isSaving} onLogin={handleLoginUser} />
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isSaving={isSaving} onUpdateUser={handleUpdateUser}
                          onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} isSaving={isSaving} onAddPlace={handleAddPlaceSubmit}
                       onClose={closeAllPopups} />
        <PopupWithForm
          title="Are you sure you want to delete this card?"
          name="remove-card"
          buttonText="Yes, delete"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmDelete}
          isSaving={isSaving}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isSaving={isSaving} onUpdateAvatar={handleUpdateAvatar}
                         onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} status={tooltipStatus}
                     message={alertMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
