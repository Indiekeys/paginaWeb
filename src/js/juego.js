"use strict";
import * as script from "./firebase_auth.js";
import * as db from "./firestore.js";

window.onload = async ()=>{
    script.comprobarAuth();
    let url = window.location.href.split("/")[window.location.href.split("/").length-1].split('-')[0];
    db.obtenerGame(url);

    document.getElementById("log_out").addEventListener(
        "click",
        (e) => {
            script.log_out();
            document.getElementById("imgAvatar").innerHTML="";
        },
        false
    )

    document.getElementById("avatar").addEventListener(
        "click",
        (e) => {
            if(document.getElementById("submenu").classList.contains("block")){
                document.getElementById("avatar").classList.remove("active");
                document.getElementById("submenu").classList.add("none");
                document.getElementById("submenu").classList.remove("block");
            }else{
                document.getElementById("avatar").classList.add("active");
                document.getElementById("submenu").classList.remove("none");
                document.getElementById("submenu").classList.add("block");
            }

        },
        false
    )

}