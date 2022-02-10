"use strict";
//Se importan dependencias.
import { app } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  setPersistence,
  signOut,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import * as validar from "./validacion.js";
import {Usuario} from "./Usuario.js";
import * as print from "./print.js";
import {crearWishlist} from "./firestore.js";
//Se crean las siguientes constantes, en las cuales se encuentra, el auth, proveedor del auth, contenedor mensaje de error y el usuario.
const auth = getAuth(app);
const providerG = new GoogleAuthProvider(app);
const providerF = new FacebookAuthProvider(app);
const divError = document.getElementById("divError");
const messageError = document.getElementById("messageError");
const usuario = new Usuario(auth);

//Función que se encarga de mantener una persistencia.
export const persistAccount = () => {
  setPersistence(auth, browserLocalPersistence);
};

/**
 * Función la cual recibe el email, password, nombre y apellidos del usuario,
 * y crea un usuario con el email y password ingresados. Luego el nombre y apellidos
 * se utilizan para actualizar el perfil del usuario. También se genera una wishlist y se pone un avatar
 * default.
 */
export const createAccount = async (email, pass,nombre,apellidos) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pass).then(
        async () => {
          await sendEmailVerification(usuario.getUsuario()).then(
              async () => {
                await usuario.setNombre(nombre,apellidos);
                await usuario.setPhotoURL("https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FiconProfile%2Fcropped-150-150-866190.jpg?alt=media&token=a02ccaa2-7914-485b-81ae-7abee13d338b");
                await crearWishlist();
              }
          );
        }
    );
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};

//Función que oculta el botón del login.
export const hideLoginError = () => {
  divError.style.display = "none";
  messageError.innerHTML = "";
};

//Constante la cual contiene los mensajes de error del login.
export const ERRORES_LOGIN = {
  "auth/invalid-email": "Por favor introduzca un correo valido",
  "auth/user-disabled": "El usuario está deshabilitado",
  "auth/user-not-found": "El usuario no existe",
  "auth/wrong-password": "La contraseña es incorrecta",
  "auth/invalid-password": "La contraseña no es valida",
  "auth/email-already-in-use": "El correo ya está en uso",
  "auth/weak-password": "La contraseña debe tener como mínimo 6 caracteres",
  "auth/popup-closed-by-user": " ",
  "auth/operation-not-allowed": "La operación no está permitida",
  "auth/popup-blocked": " ",
  "auth/cancelled-popup-request": " ",
  "auth/too-many-requests": "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.",
};

//Función que se encarga de iniciar sesión o crear la cuenta con el auth de Google.
export const authGoogle = async () => {
  try {
    await signInWithPopup(auth, providerG);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};
//Función que se encarga de iniciar sesión o crear la cuenta con el auth de Facebook.
export const authFacebook = async () => {
  try {
    await signInWithPopup(auth, providerF);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};

//Función que recibe un email y una contraseña e inicia sesión con el auth de Firebase.
export const signAccount = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};

//Función que comprueba si no ha iniciado sesión hace un redirect.
export const correctAuth = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user != null) {
      setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  });
};

//Función que comprueba el auth y dependiendo del estado.
export const comprobarAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      validar.printLogOut();
      document.getElementById("imgAvatar").innerHTML=print.printAvatar(user);
    } else {
      validar.printLogIn();
    }
  });
};
//Función que comprueba si no esta logueado.
export const isNotLoggedIn = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user === null) {
      setTimeout(() => {
        window.location.assign("/");
      },1000);
    }
  });
}

//Función que cierra la sesión.
export const log_out = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

//Función que se encarga de poner el avatar default.
export const setDefaultImageProfile = () => {
    updateProfile(usuario.getUsuario(), {
      photoURL: "https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FiconProfile%2Fcropped-150-150-866190.jpg?alt=media&token=a02ccaa2-7914-485b-81ae-7abee13d338b",
    }).catch(() => {
      try{
        updateProfile(usuario.getUsuario(), {
          photoURL: "https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FiconProfile%2Fcropped-150-150-866190.jpg?alt=media&token=a02ccaa2-7914-485b-81ae-7abee13d338b",
        });
      }catch (error) {}
    });
}