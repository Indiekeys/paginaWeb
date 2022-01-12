"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";



const firebaseConfig = {
    apiKey: "AIzaSyC_z7q2AQoKPzJ9fEsGe_x04uc9WYDAFl8",
    authDomain: "indiekeys.firebaseapp.com",
    databaseURL: "https://indiekeys-default-rtdb.firebaseio.com",
    projectId: "indiekeys",
    storageBucket: "indiekeys.appspot.com",
    messagingSenderId: "1048792979110",
    appId: "1:1048792979110:web:bdbf8242ae9bec28024667",
    measurementId: "G-316DCVS8D5"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export {app};


