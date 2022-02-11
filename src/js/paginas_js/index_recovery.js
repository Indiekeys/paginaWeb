"use strict";
//Se importan dependencias
import { correctAuth } from "../firebase/firebase_auth.js";
import { recoveryPassword } from "./recoveryPassword.js";
window.onload = () => {
  //Si el auth es correcto se puede acceder a la página
  correctAuth();

  //Se crea un eventlistener en el formulario, cuando se envía el formulario se ejecuta la función de recuperación de contraseña.
  document.getElementById("recuperar-password").addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      recoveryPassword();
    },
    false
  );
};
