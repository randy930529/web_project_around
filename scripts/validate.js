function showInputError(formElement, inputElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
}

function hiddenInputError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hiddenInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleSubmitButton(inputList, submitButtonElement, config) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(config.inactiveButtonClass);
  } else {
    submitButtonElement.classList.remove(config.inactiveButtonClass);
  }
}

function checkFormValidity(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );
  toggleSubmitButton(inputList, submitButtonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleSubmitButton(inputList, submitButtonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    checkFormValidity(formElement, config);
  });
}
