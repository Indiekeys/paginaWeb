"use strict";
import * as script from "./firebase_auth.js";

window.onload = ()=>{


    document.getElementById("sign_out").addEventListener(
        "click",
        (e) => {

            script.sign_out();
        },
        false
    )

}