"use strict";
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
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import * as validar from "./validacion.js";

const auth = getAuth(app);

const providerG = new GoogleAuthProvider(app);
const providerF = new FacebookAuthProvider(app);
const divError = document.getElementById("divError");
const messageError = document.getElementById("messageError");

export const persistAccount = () => {
  setPersistence(auth, browserLocalPersistence);
};

export const createAccount = async (email, pass) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    showLoginError(error);
  }
};

export const hideLoginError = () => {
  divError.style.display = "none";
  messageError.innerHTML = "";
};

export const showLoginError = (error) => {
  divError.style.display = "block";
  console.log(error.code);
  //Optimizar
  switch (error.code) {
    case "auth/invalid-email":
      messageError.innerHTML = "Por favor introduzca un correo valido";
      break;
    case "auth/wrong-password":
      messageError.innerHTML = "La contraseña es incorrecta";
      break;
    case "auth/invalid-password":
      messageError.innerHTML = "Contraseña incorrecta";
      break;
    case "auth/user-not-found":
      messageError.innerHTML = "El usuario no existe";
      break;
    case "auth/user-disabled":
      messageError.innerHTML = "El usuario está deshabilitado";
      break;
    case "auth/email-already-in-use":
      messageError.innerHTML = "El correo ya esta en uso";
      break;
    case "auth/weak-password":
      messageError.innerHTML =
        "La contraseña debe tener como mínimo 6 caracteres";
      break;
    case "auth/popup-blocked":
      messageError.innerHTML = "";
      break;
    case "auth/popup-closed-by-user":
      messageError.innerHTML = "";
      break;
    case "auth/cancelled-popup-request":
      messageError.innerHTML = "";
      break;
    case "auth/too-many-requests":
      messageError.innerHTML =
        "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.";
      break;
    default:
      messageError.innerHTML =
        "Ha surgido un error inesperado, inténtelo de nuevo";
      break;
  }
};

export const authGoogle = async () => {
  try {
    await signInWithPopup(auth, providerG);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    showLoginError(error);
  }
};

export const authFacebook = async () => {
  try {
    await signInWithPopup(auth, providerF);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    showLoginError(error);
  }
};

export const signAccount = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    showLoginError(error);
  }
};

export const correctAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      window.location.href = "/";
    }
  });
};

export const comprobarAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      validar.printLogOut();
    } else {
      validar.printLogIn();
    }
  });
};

export const log_out = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
