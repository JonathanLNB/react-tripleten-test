import React from "react";

function PopupWithForm({
                         title,
                         name,
                         isOpen,
                         buttonText = "Save",
                         onSubmit,
                         onClose,
                         isSaving,
                         children
                       }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_is-opened" : ""}`} onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div className="popup__content">
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <button type="button" className="popup__close" onClick={onClose}></button>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button type="submit" className="button popup__button"
                  disabled={isSaving}>{isSaving ? "Loading..." : buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
