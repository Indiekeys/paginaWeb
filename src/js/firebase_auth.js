"use strict";
import { app } from "./firebase.js";
import {getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
const auth = getAuth(app);

export const createAccount = async (email,pass) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,pass);
        console.log(userCredential.user);
    }catch (error){
        console.log(error);
    }
}