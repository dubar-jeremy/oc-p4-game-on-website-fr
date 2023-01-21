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
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form[name='reserve']");


// listeners

/**
 @listener
 @param {HTMLElement} modalBtn - An element with the class ".modal-btn"
 @event click - when the element is clicked, the "launchModal" function is called
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));



/**
@listener
@param {HTMLElement} closeBtn - An element with the class ".close"
@event click - when the element is clicked, the "closeModal" function is called
*/
closeBtn.addEventListener('click', closeModal)



// functions 

/** 
 @function launchModal
 @description This function makes the modal visible by setting the display property of an element with the id "modalbg" to "block".
 */
function launchModal() {
  modalbg.style.display = "block";
}


/**
@function closeModal
@description This function hides the modal by setting the display property of an element with the id "modalbg" to "none".
*/
function closeModal() {
  modalbg.style.display = "none";
}
