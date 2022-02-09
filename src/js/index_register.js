"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";
import {crearWishlist} from "./firestore.js";
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
                    await script.createAccount(correo, pass,nombre,apellidos);
            }else{
                document.getElementById("messageError").innerHTML = "Ha surgido un error inesperado, inténtelo de nuevo";
            }
        },
        false
    )

    document.getElementById("google").addEventListener(
        "click",
        async () => {
            await script.authGoogle().then(async () => {
              await script.setDefaultImageProfile();
              await crearWishlist();
            });
        },
        false
    )

    document.getElementById("facebook").addEventListener(
        "click",
        async () => {
            await script.authFacebook().then(async () => {
              await script.setDefaultImageProfile();
              await crearWishlist();
            });
        },
        false
    )


}