"use strict";
import * as script from "./firebase_auth.js";
import * as db from "./firestore.js";

window.onload = async ()=>{
    script.comprobarAuth();
    let url = window.location.href.split("/")[window.location.href.split("/").length-1].split('-')[0];
    db.obtenerGame(url);
}