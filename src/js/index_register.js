"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";
import {setDisplayName} from "./firebase_auth.js";


window.onload = ()=>{

script.hideLoginError();
script.correctAuth();


    document.getElementById("registrar").addEventListener(
        "click",
        async (e) => {
            let nombre = document.getElementById("nombre").value;
            let apellidos = document.getElementById("apellidos").value;
            let correo = document.getElementById("correo").value;
            let pass = document.getElementById("pass").value;
            let pass2 = document.getElementById("repeat_pass").value;

            if(validar.validacionPass(pass,pass2)) {
                await script.createAccount(correo, pass);
                await script.setDisplayName(nombre, apellidos);
                await script.setDefaultImageProfile();
            }else{
                script.showLoginError("error");
            }
        },
        false
    )

    document.getElementById("google").addEventListener(
        "click",
        async (e) => {
            await script.authGoogle();
            await script.setDefaultImageProfile();
        },
        false
    )

    document.getElementById("facebook").addEventListener(
        "click",
        async (e) => {
            await script.authFacebook();
            await script.setDefaultImageProfile();
        },
        false
    )




}