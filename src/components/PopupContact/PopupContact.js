import React from "react";
import "./PopupContact.css";
import { useFormWithValidation } from "../../utils/formValidation";
import send from "../../utils/send.php";

function PopupContact(props) {
  const validate = useFormWithValidation();

  return (
    <>
      <div
        className={`popup-contact ${props.isOpen && "popup-contact_opened"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.onClose();
          }
        }}
      >
        <form className="popup-contact__container" method="post" action={send}>
          <button
            type="button"
            onClick={props.onClose}
            className="popup-contact__button-close"
          ></button>
          <h2 className="popup-contact__title">Contact Me</h2>
          <fieldset className="popup-contact__field-list">
            <div className="popup-contact__field">
              <label htmlFor="name" className="popup-contact__label">
                Your Name
              </label>
              <input
                onChange={validate.handleChange}
                className={`popup-contact__input ${
                  validate.errors.name ? "popup-contact__input_error" : ""
                }`}
                name="name"
                label="name"
                type="text"
                minLength="1"
                maxLength="30"
                value={validate.values.name || ""}
                required
              />
              <span className="popup-contact__error">
                {validate.errors.name || ""}
              </span>
            </div>
            <div className="popup-contact__field">
              <label htmlFor="email" className="popup-contact__label">
                Your E-mail
              </label>
              <input
                onChange={validate.handleChange}
                className={`popup-contact__input ${
                  validate.errors.email ? "popup-contact__input_error" : ""
                }`}
                name="email"
                label="e-mail"
                type="email"
                value={validate.values.email || ""}
                required
              />
              <span className="popup-contact__error">
                {validate.errors.email || ""}
              </span>
            </div>
            <div className="popup-contact__field">
              <label htmlFor="tel" className="popup-contact__label">
                Telephone
              </label>
              <input
                className="popup-contact__input"
                name="phone"
                label="tel"
                type="tel"
                // value='+7(___)___-__-__'
                pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                placeholder="+7(___)___-__-__"
                required
              />
              <span className="popup-contact__error">
                {validate.errors.tel || ""}
              </span>
            </div>
            <div className="popup-contact__field">
              <label htmlFor="text" className="popup-contact__label">
                Message
              </label>
              <input
                name="msg"
                type="textarea"
                label="text"
                className="popup-contact__input"
              />
            </div>
          </fieldset>
          <button
            className={`popup-contact__submit ${
              validate.isValid ? "" : "popup-contact__submit_disabled"
            }`}
            type="submit"
            disabled={!validate.isValid}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default PopupContact;
