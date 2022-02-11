"use strict";
//Se importan dependencias.
import { app } from "../firebase/firebase.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
const auth = getAuth(app);

//Se crea una constante la cual tendrá los mensajes de error de autenticación.
const MSG_ERRORES = {
  "auth/invalid-email": "El correo electrónico no es válido.",
  "auth/missing-android-pkg-name":
    "Falta el nombre del paquete del aplicativo Android.",
  "auth/missing-continue-uri": " ",
  "auth/missing-ios-bundle-id":
    "Falta el identificador del paquete del aplicativo iOS.",
  "auth/invalid-continue-uri": " ",
  "auth/unauthorized-continue-uri": " ",
  "auth/user-not-found": "No se encontró el usuario.",
};
/**
 * Función que sirve para la recuperación de la contraseña, obtendrá el valor del email y enviara un correo con el link para recuperar la contraseña.
 * Si algo falla se mostrara un mensaje de error y si se envía, se informara que se envió el correo.
 */
export const recoveryPassword = () => {
  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Se ha enviado un correo electrónico a su cuenta con las instrucciones para recuperar su contraseña.",
        showConfirmButton: false,
        timer: 3000,
      });
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: MSG_ERRORES[error.code],
        showConfirmButton: false,
        timer: 3000,
      });
    });
};
