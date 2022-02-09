"use strict";
import { app } from "./firebase.js";
import {getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
const auth = getAuth(app);

const MSG_ERRORES = {
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/missing-android-pkg-name": "Falta el nombre del paquete del aplicativo Android.",
  "auth/missing-continue-uri": " ",
  "auth/missing-ios-bundle-id": "Falta el identificador del paquete del aplicativo iOS.",
  "auth/invalid-continue-uri": " ",
  "auth/unauthorized-continue-uri": " ",
  "auth/user-not-found": "No se encontró el usuario.",
}

export const recoveryPassword = () => {
  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth,email)
    .then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se ha enviado un correo electrónico a su cuenta con las instrucciones para recuperar su contraseña.",
        showConfirmButton: false,
        timer: 3000,
      });
    }).catch(error => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: MSG_ERRORES[error.code],
      showConfirmButton: false,
      timer: 3000,
    });

    });
}


