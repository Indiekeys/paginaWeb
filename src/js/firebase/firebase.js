"use strict";
//Se importa la dependencia.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";


//Se crea la configuración de firebase.
const firebaseConfig = {

    apiKey: "AIzaSyBBcVTcLP_jDrRYKOj4ayXncHdzMzxzDQo",

    authDomain: "indiekeys-d0568.firebaseapp.com",

    projectId: "indiekeys-d0568",

    storageBucket: "indiekeys-d0568.appspot.com",

    messagingSenderId: "965307358432",

    appId: "1:965307358432:web:9bd7ae4d1adacd8ae24485",

    measurementId: "G-9MCGDMCRRQ"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};


