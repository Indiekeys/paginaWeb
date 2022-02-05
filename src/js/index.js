"use strict";
import * as script from "./firebase_auth.js";
import * as db from "./firestore.js";

window.onload = ()=>{


    script.comprobarAuth();
    db.gamesDate();
    db.obtenerMasDescuento();
    db.obtenerDlc();

    document.getElementById("log_out").addEventListener(
        "click",
        (e) => {

            script.log_out();
        },
        false
    )

}