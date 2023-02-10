function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector('.close');
const form = document.querySelector("form[name='reserve']");
const content = document.querySelector(".content");
const successBox = document.querySelector(".success-box")
const closeSuccessBtn = document.querySelector(".close-success-message")
const conditions = document.querySelector('#generalConditions');



// listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener('click', closeModal)
form.addEventListener("submit", onSubmit);
form.addEventListener("keyup", onChange);
closeSuccessBtn.addEventListener("click", closeSuccessMessage)
conditions.addEventListener("click", checkConditionValidity)


function launchModal() {
  modalbg.style.display = "block";

  if (content.style.display = "none") {
    content.style.display = "block";
  }
}


function closeModal() {
  const formData = new FormData(form);
  clearForm(formData)
  modalbg.style.display = "none";

}

/**
 * @param : input name
 * @returns a validation nested objet or a single object in an input name is provided
 */
function getValidationRules(input = false) {
  const validation = {
    firstName: {
      input: "firstName",
      regex: /^.{2,}$/,
      errorMessage: "veuillez entrez un prénom valide. (min 2 charactères)"
    },
    lastName: {
      input: "lastName",
      regex: /^.{2,}$/,
      errorMessage: "veuillez entrez un nom valide. (min 2 charactères)"
    },
    email: {
      input: "email",
      regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      errorMessage: "veuillez entrez une adresse email valide"
    },
    birthdate: {
      input: "birthdate",
      regex: /^\d{4}-\d{2}-\d{2}$/,
      errorMessage: "Veuillez entrer une date de naissance valide (DD-MM-YYYY)",
    },
    quantity: {
      input: "quantity",
      regex: /^(?:[1-9]|[1-9][0-9])$/,
      errorMessage: "la quantité doit être comprise entre 1 et 99"
    },
  }

  if (input) {
    return validation[input]
  }

  return validation;

}

/**
 * @returns true if the value matchs the regex provided. Otherwise return false
 */
function checkValue(value, regex) {
  return regex.test(value);
}


/**
 * Display a succes message in a modal when the form has been submitted with success
 */
function displaySuccessMessage() {
  content.style.display = "none";
  document.querySelector(".bground-2").style.display = "block"
  successBox.style.display = "block";
}

/**
 * close the success message modal when the user click on the button "Fermer";
 */
function closeSuccessMessage() {
  successBox.style.display = "none";
  document.querySelector(".bground-2").style.display = "none"
}



/**
 * display an error message for the input provided
 * @param error : the error message (string)
 */
function displayError(input, error) {
  const inputField = document.querySelector(`input[name='${input}']`);
  const errorNode = document.createElement("p");
  errorNode.innerHTML = error;
  errorNode.classList.add("error-message");
  inputField.parentNode.appendChild(errorNode);
}

/**
 * remove the error message from the input provided
 */
function removeError(input) {
  const inputField = document.querySelector(`input[name='${input}']`);
  const errorNode = inputField.parentNode.querySelector(`.error-message`);
  if (errorNode) {
    inputField.parentNode.removeChild(errorNode);
  }
  inputField.removeAttribute("data-error");
}

/**
 * remove all values form the form provided;
 */
function clearForm(formData) {
  for (const key of formData.keys()) {
    const input = form.querySelector(`[name=${key}]`);
    if (input) {
      input.value = "";
      removeError(input.name)
    }
  }
}

/**
 * display error on invalid input
*/
function handleErrors(input, regex, errorMessage) {


  if (!checkValue(input.value, regex) && !input.hasAttribute("data-error")) {
    isFormValid = false
    input.dataset.error = true;
    displayError(input.name, errorMessage);
  }

  if (checkValue(input.value, regex) && input.hasAttribute("data-error")) {
    isFormValid = true
    input.removeAttribute("data-error");
    removeError(input.name);
  }

  return isFormValid

}

/**
 * get the validation rules objet and handle errors onChange
 */
function onChange(e) {
  if (!e?.target) {
    return;
  }
  const { regex, errorMessage } = getValidationRules(e.target.name);

  handleErrors(e.target, regex, errorMessage);

}

/**
 * Check if conditions has been accepted by the user
 */
function checkConditionValidity() {

  if (!conditions.checked && !conditions.hasAttribute("data-error")) {
    conditions.dataset.error = true;
    displayError(conditions.name, "Vous devez accepter les conditions");
    return false;
  }

  if (conditions.checked && conditions.hasAttribute("data-error")) {
    conditions.removeAttribute("data-error");
    removeError(conditions.name);
    return true;
  }

}
/**
 * check the validity for inputs in the formData object
 * @return false if any input has an attribute "data-error"
 * @see handleErrors func
 */
function isValid(formData) {

  for (const data of formData.entries()) {
    const inputName = data[0];

    const input = document.querySelector(`input[name='${inputName}']`);

    const validation = getValidationRules();

    if (validation[inputName]?.regex) {
      handleErrors(input, validation[inputName].regex, validation[inputName].errorMessage)
    }
  }

  checkConditionValidity()

  // make sure there is no attribute "data-error". Means that the form is 100% valid
  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].hasAttribute("data-error")) {
      return false;
    }
  }

  return true;

}


/**
 * submit the form and open a success message in a modal if it is valid
 * display error if not valid @see isValid
 */
function onSubmit(event) {
  
  event.preventDefault();

  const formData = new FormData(form);

  if (!isValid(formData)) {
    return;
  }

  // where we should send/persist data
  clearForm(formData)
  closeModal();
  displaySuccessMessage()
}

