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
  updateProfile,
  sendEmailVerification
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
    await sendEmailVerification(auth.currentUser);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};

export const hideLoginError = () => {
  divError.style.display = "none";
  messageError.innerHTML = "";
};

export const ERRORES_LOGIN = {
  "auth/invalid-email": "Por favor introduzca un correo valido",
  "auth/user-disabled": "El usuario está deshabilitado",
  "auth/user-not-found": "El usuario no existe",
  "auth/wrong-password": "La contraseña es incorrecta",
  "auth/invalid-password": "La contraseña no es valida",
  "auth/email-already-in-use": "El correo ya está en uso",
  "auth/weak-password": "La contraseña debe tener como mínimo 6 caracteres",
  "auth/popup-closed-by-user": "",
  "auth/operation-not-allowed": "La operación no está permitida",
  "auth/popup-blocked": "",
  "auth/cancelled-popup-request": "",
  "auth/too-many-requests": "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde.",
};

export const authGoogle = async () => {
  try {
    await signInWithPopup(auth, providerG);
    hideLoginError();
    persistAccount();
    correctAuth();
  } catch (error) {
    console.log(error);
    divError.style.display = "block";
    messageError.innerHTML = ERRORES_LOGIN[error.code] || "Ha surgido un error inesperado, inténtelo de nuevo" ;
  }
};

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

export const correctAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      window.location.assign("/");
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

export const setDisplayName = async (nombre,apellidos) => {
  try{
    updateProfile(auth.currentUser, {
      displayName:  nombre + " " + apellidos,
    });
  }catch (error) {
    console.log(error);
  }
}

export const setDefaultImageProfile = () => {
  try{
    updateProfile(auth.currentUser, {
      photoURL: "https://firebasestorage.googleapis.com/v0/b/indiekeys-d0568.appspot.com/o/images%2FiconProfile%2Fcropped-150-150-866190.jpg?alt=media&token=a02ccaa2-7914-485b-81ae-7abee13d338b",
    });
  }catch (error) {
    console.log(error);
  }
}