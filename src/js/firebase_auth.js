"use strict";
import { app } from "./firebase.js";
import {getAuth,createUserWithEmailAndPassword,AuthErrorCodes,GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,setPersistence,browserLocalPersistence,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";


const auth = getAuth(app);

const providerG = new GoogleAuthProvider(app);
const providerF = new FacebookAuthProvider(app);

export const persistAccount = () => {

    const persistCredential = setPersistence(auth,browserLocalPersistence);
}


export const createAccount = async (email,pass) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,pass);
        persistAccount(email,pass);
        hideLoginError();

    }catch (error){
        showLoginError(error);
    }
}

var divError = document.getElementById("divError");
var messageError = document.getElementById("messageError");

export const hideLoginError = () => {
    divError.style.display = "none";
    messageError.innerHTML = "";

}

export const showLoginError = (error) => {
    divError.style.display = "block";
    if(error.code == AuthErrorCodes.INVALID_PASSWORD){
        messageError.innerHTML = "Error al introducir la contraseña";
    }else if(error=="error"){
        messageError.innerHTML = "Las contraseñas no coinciden";
    }else{
        messageError.innerHTML = `Error: ${error.message}`;
    }
}

export const authGoogle = async () => {

    try {
        const credentialGoogle = await signInWithPopup(auth, providerG);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        persistAccount();
        hideLoginError();


    }catch (error){
        showLoginError(error);
    }

}

export const authFacebook = async () => {

    try {
        const credentialFacebook = await signInWithPopup(auth, providerF);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        persistAccount();
        hideLoginError();

    }catch (error){
        showLoginError(error);
    }
}

export const prueba = auth.onAuthStateChanged (user => {

    console.log(user);

});