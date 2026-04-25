import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, isSaving, onUpdateUser, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  let currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen} isSaving={isSaving} onSubmit={handleSubmit} onClose={onClose} title="Edit Profile" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Name"
               required minLength="2" maxLength="40"
               value={name} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="About me"
               required minLength="2" maxLength="200"
               value={description} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
