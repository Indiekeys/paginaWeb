"use strict";
import { app } from "./firebase.js";
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,AuthErrorCodes,GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,setPersistence,signOut,browserLocalPersistence,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";

const auth = getAuth(app);

const providerG = new GoogleAuthProvider(app);
const providerF = new FacebookAuthProvider(app);
const divError = document.getElementById("divError");
const messageError = document.getElementById("messageError");

export const persistAccount = () => {

    const persistCredential = setPersistence(auth,browserLocalPersistence);
}

export const createAccount = async (email,pass) => {
    try {
        const createCredential = await createUserWithEmailAndPassword(auth,email,pass);
        hideLoginError();
        persistAccount();
        correctAuth();

    }catch (error){
        showLoginError(error);
    }
}

export const hideLoginError = () => {
    divError.style.display = "none";
    messageError.innerHTML = "";

}

export const showLoginError = (error) => {
    divError.style.display = "block";
    console.log(error.code);
    if(error.code == AuthErrorCodes.INVALID_PASSWORD){
        messageError.innerHTML = "Error al introducir la contraseña";
    }else if(error=="error"){
        messageError.innerHTML = "Las contraseñas no coinciden";
    }else if(error.code == "auth/invalid-email"){
        messageError.innerHTML = "Por favor introduzca un correo valido";
    }else if(error.code == "auth/weak-password"){
        messageError.innerHTML = "La contraseña debe tener como mínimo 6 caracteres";
    }else{
        messageError.innerHTML = `Error: ${error.message}`;
    }
}

export const authGoogle = async () => {

    try {
        const credentialGoogle = await signInWithPopup(auth, providerG);
        hideLoginError();
        persistAccount();
        correctAuth();

    }catch (error){
        showLoginError(error);
    }
}

export const authFacebook = async () => {

    try {
        const credentialFacebook = await signInWithPopup(auth, providerF);
        hideLoginError();
        persistAccount();
        correctAuth();

    }catch (error){
        showLoginError(error);
    }
}

export const signAccount = async (email,pass) => {

    try {
        const signCredential = await signInWithEmailAndPassword(auth, email, pass);
        hideLoginError();
        persistAccount();
        correctAuth();

    }catch (error){
        showLoginError(error);
    }
}

export const correctAuth = () => {

    onAuthStateChanged(auth, (user) => {
        if (user!= null) {
            window.location.href = "../paginas/index.html";
        }

    });

};

export const sign_out = async () => {

    try {
        const signOutAuth = await signOut(auth);
        window.location.href = "../paginas/index.html";
    }catch (error){
        console.log(error);
    }
};





