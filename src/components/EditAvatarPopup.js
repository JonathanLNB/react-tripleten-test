import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  function handleChange(e) {
    const input = e.target;
    const { value } = input;
    setValue(value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Change profile picture" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="text" name="avatar" id="owner-avatar"
               value={value}
               onChange={handleChange}
               className="popup__input popup__input_type_description" placeholder="Image link"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
