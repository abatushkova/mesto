
const showInputError = (formElement, inputElement, errorMessage, {...args}) => {
  // find error elm in form
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(args.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(args.errorClass);
};

const hideInputError = (formElement, inputElement, {...args}) => {
  // find error elm
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(args.inputErrorClass);
  errorElement.classList.remove(args.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, {...args}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(args.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(args.inactiveButtonClass);
  }
}

const isValid = (formElement, inputElement, {...args}) => {
  console.log(inputElement.validationMessage);

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

const setEventListeners = (formElement, {...args}) => {
  // find inputs in form, create array of inputs
  const inputList = Array.from(document.querySelectorAll(args.inputSelector));
  const buttonElement = formElement.querySelector(args.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, args);

  inputList.forEach((inputElement) => {
    // set listener to every input on input-event
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, args);
      
      // call isValid with form and input as params
      isValid(formElement, inputElement, args);
    });
  });
};

function enableValidation({...args}) {
  // create array of forms in DOM
  const formList = Array.from(document.querySelectorAll(args.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // prevent default action of submit
    });

    // call setEventListeners with form as param
    setEventListeners(formElement, args);
  });
};
