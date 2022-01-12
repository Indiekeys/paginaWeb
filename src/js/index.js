"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";


window.onload = ()=>{



document.getElementById("google").addEventListener(
    "click",
    (e) => {

        let correo = document.getElementById("correo").value;
        let pass = document.getElementById("pass").value;
        let pass2 = document.getElementById("repeat_pass").value;

        if(validar.validacionPass(pass,pass2)) {
            script.createAccount(correo,pass2);
        }else{
            console.log("tonto");
        }
    },
    false
)


}