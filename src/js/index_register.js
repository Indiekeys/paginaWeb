"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";


window.onload = ()=>{

script.hideLoginError();
script.correctAuth();


    document.getElementById("registrar").addEventListener(
        "click",
        (e) => {

            let correo = document.getElementById("correo").value;
            let pass = document.getElementById("pass").value;
            let pass2 = document.getElementById("repeat_pass").value;

            if(validar.validacionPass(pass,pass2)) {
                script.createAccount(correo,pass);
            }else{
                script.showLoginError("error");
            }
        },
        false
    )

    document.getElementById("google").addEventListener(
        "click",
        (e) => {

            script.authGoogle();
        },
        false
    )

    document.getElementById("facebook").addEventListener(
        "click",
        (e) => {

            script.authFacebook();
        },
        false
    )




}