"use strict";
import {correctAuth} from "./firebase_auth.js";
import {recoveryPassword} from "./recoveryPassword.js";
window.onload = () => {
  correctAuth();
  
  document.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      recoveryPassword();
  },false);

}