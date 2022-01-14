"use strict";
import * as script from "./firebase_auth.js";
import * as validar from "./validacion.js";

window.onload = ()=>{


    script.comprobarAuth();

    document.getElementById("log_out").addEventListener(
        "click",
        (e) => {

            script.log_out();
        },
        false
    )

}