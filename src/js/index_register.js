"use strict";
//Se importan dependencias.
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";
import {crearWishlist} from "./firestore.js";
window.onload = () => {
  //Se comprueba si la sesión esta iniciada o no.
  script.hideLoginError();
  script.correctAuth();

  /**
   * Se crea un eventlistener en el formulario del registro, cuando se envíe el formulario se validara la contraseña, si la contraseña es válida
   * se creara la cuenta del usuario, si las contraseñas no coinciden se mostrara un error.
   */
  document.getElementById("form_registro").addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();
      let nombre = document.getElementById("nombre").value;
      let apellidos = document.getElementById("apellidos").value;
      let correo = document.getElementById("correo").value;
      let pass = document.getElementById("pass").value;
      let pass2 = document.getElementById("repeat_pass").value;

      if (validar.validacionPass(pass, pass2)) {
        await script.createAccount(correo, pass, nombre, apellidos);
      } else {
        document.getElementById("messageError").innerHTML =
          "Ha surgido un error inesperado, inténtelo de nuevo";
      }
    },
    false
  );

  //Se crea un eventlistener del auth de google, si realizar clic sobre el botón se creara una cuenta con google.
  document.getElementById("google").addEventListener(
    "click",
    async () => {
      await script.authGoogle().then(async () => {
        await script.setDefaultImageProfile();
        await crearWishlist();
      });
    },
    false
  );
  //Se crea un eventlistener del auth de facebook, si realizar clic sobre el botón se creara una cuenta con facebook.
  document.getElementById("facebook").addEventListener(
    "click",
    async () => {
      await script.authFacebook().then(async () => {
        await script.setDefaultImageProfile();
        await crearWishlist();
      });
    },
    false
  );
};
