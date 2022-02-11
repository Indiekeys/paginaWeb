"use strict";
//Se importan dependencias.
import * as script from "../firebase/firebase_auth.js";

window.onload = () => {
  //Se comprueba el auth.
  script.hideLoginError();
  script.correctAuth();
  //Se crea un eventlistener en el id sign_in, cuando se envíe el formulario se ejecutara la función de iniciar sesión.
  document.getElementById("sign_in").addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      let correo = document.getElementById("email").value;
      let pass = document.getElementById("pass").value;

      script.signAccount(correo, pass);
    },
    false
  );

  //Se crea un eventlistener en el botón login del auth de google, cuando se realize clic sobre él se ejecutara la función de iniciar sesión.
  document.getElementById("google").addEventListener(
    "click",
    () => {
      script.authGoogle();
    },
    false
  );
  //Se crea un eventlistener en el botón login del auth de facebook, cuando se realize clic sobre él se ejecutara la función de iniciar sesión.
  document.getElementById("facebook").addEventListener(
    "click",
    () => {
      script.authFacebook();
    },
    false
  );
};
