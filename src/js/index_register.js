"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";

window.onload = () => {

script.hideLoginError();
script.correctAuth();


    document.getElementById("form_registro").addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            let nombre = document.getElementById("nombre").value;
            let apellidos = document.getElementById("apellidos").value;
            let correo = document.getElementById("correo").value;
            let pass = document.getElementById("pass").value;
            let pass2 = document.getElementById("repeat_pass").value;

            if(validar.validacionPass(pass,pass2)) {
                if(await script.createAccount(correo, pass)){
                    await script.setDisplayName(nombre, apellidos);
                    await script.setDefaultImageProfile();
                }
            }else{
                console.log("Las contraseñas no coinciden");
                document.getElementById("messageError").innerHTML = "Ha surgido un error inesperado, inténtelo de nuevo";
            }
        },
        false
    )

    document.getElementById("google").addEventListener(
        "click",
        async () => {
            if(await script.authGoogle()){
                await script.setDefaultImageProfile();
            }
        },
        false
    )

    document.getElementById("facebook").addEventListener(
        "click",
        async () => {
            if(await script.authFacebook()){
                await script.setDefaultImageProfile();
            }
        },
        false
    )


}