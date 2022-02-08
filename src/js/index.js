"use strict";
import * as script from "./firebase_auth.js";
import * as db from "./firestore.js";
import {queryGamesPlatform} from "./firestore.js";

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

    document.getElementById("plataforma").addEventListener(
        "change",
        (e) => {
            document.getElementById("order").selectedIndex=0;
            document.getElementById("option").selectedIndex=0;

            if(!e.target.value==""){
                db.queryGamesPlatform(e.target.value);
            }
        },
        false
    )

    document.getElementById("order").addEventListener(
        "change",
        (e) => {
            document.getElementById("plataforma").selectedIndex=0;
            document.getElementById("option").selectedIndex=0;

            if(!e.target.value==""){
                db.queryGames(e.target.value);
            }

        },
        false
    )

    document.getElementById("option").addEventListener(
        "change",
        (e) => {
            document.getElementById("plataforma").selectedIndex=0;
            document.getElementById("order").selectedIndex=0;

            if(!e.target.value==""){
                if(e.target.value=="todo"){
                    db.obtenerGames();
                }else {
                    db.queryGamesOption(e.target.value);
                }
            }

        },
        false
    )

    document.getElementById("todos").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            db.obtenerGames();
        },
        false
    )

    document.addEventListener(
        "click",
        (e) => {

            if (e.target.id=="botonJuegos"){

                document.getElementById("order").selectedIndex=0;
                document.getElementById("plataforma").selectedIndex=0;
                db.obtenerGames();
            }
        },
        false
    )


}