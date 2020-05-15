const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  // find error element in form
  const errorList = Array.from(formElement.querySelectorAll(`#${inputElement.id}-error`));

  inputElement.classList.add(inputErrorClass);

  errorList.forEach((errorElement) => {
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  });
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  // find error element
  const errorList = Array.from(formElement.querySelectorAll(`#${inputElement.id}-error`));

  inputElement.classList.remove(inputErrorClass);

  errorList.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  });
};

const isValid = (formElement, inputElement, {...args}) => {

  if (!inputElement.validity.valid) {
    // showInputError gets form and input as params  
    // with input to check
    showInputError(formElement, inputElement, inputElement.validationMessage, args);
  } else {
    
    // hideInputError gets form and input as params 
    // with input to check
    hideInputError(formElement, inputElement, args);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...args}) => {
  // find inputs in form, create array of inputs
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, args);

  inputList.forEach((inputElement) => {
    // set listener to every input on input-event,
    inputElement.addEventListener('input', () => {
      // check button state
      toggleButtonState(inputList, buttonElement, args);
      
      // call isValid with form and input as params
      isValid(formElement, inputElement, args);
    });
  });
};

function enableValidation({formSelector, ...args}) {
  // create array of forms in DOM
  const formList = Array.from(document.querySelectorAll(formSelector));
  console.log(formList);
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // prevent default action of submit
    });
    
    // call setEventListeners for every form
    setEventListeners(formElement, args);
  });
}
