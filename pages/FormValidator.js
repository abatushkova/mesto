
export class FormValidator {
  constructor(formArgs, popupSelector) {
    this._formSelector = formArgs.formSelector;
    this._inputSelector = formArgs.inputSelector;
    this._submitBtnSelector = formArgs.submitBtnSelector;
    this._inactiveSubmitClass = formArgs.inactiveSubmitClass;
    this._inputErrorClass = formArgs.inputErrorClass;
    this._errorClass = formArgs.errorClass;
    this._popupSelector = popupSelector;
  }

  _getTemplate() {
    const form = document
      .querySelector(this._popupSelector)
      .querySelector(this._formSelector);
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const button = form.querySelector(this._submitBtnSelector);

    this._formElement = form;
    this._inputList = inputList;
    this._buttonElement = button;
  }

  _cleanForm() {
    this._getTemplate();
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
    inputList.forEach((inputElement) => {
      inputElement.value = ''; // clean input value

      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement, errorMessage) {
    // find error element in form
    const errorList = Array.from(this._formElement.querySelectorAll(`#${inputElement.id}-error`));
  
    inputElement.classList.add(this._inputErrorClass);
  
    errorList.forEach((errorElement) => {
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
    });
  };
  
  _hideInputError(inputElement) {
    // find error element in form
    const errorList = Array.from(this._formElement.querySelectorAll(`#${inputElement.id}-error`));
  
    inputElement.classList.remove(this._inputErrorClass);
  
    errorList.forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleBtnState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveSubmitClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveSubmitClass);
    }
  }

  _setEventListeners() {
    this._getTemplate();
  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // prevent default action of submit
    });

    this._toggleBtnState(this._inputList, this._buttonElement);
  
    this._inputList.forEach((inputElement) => {
      // set listener to every input on input-event,
      inputElement.addEventListener('input', () => {
        // check button state
        this._toggleBtnState(this._inputList, this._buttonElement);
        
        // call isValid with form and input as params
        this._isValid(inputElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
