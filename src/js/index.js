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
            window.location.href="/";
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
            }else{
                db.obtenerGames();
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
            }else{
                db.obtenerGames();
            }

        },
        false
    )

    document.getElementById("option").addEventListener(
        "change",
        (e) => {
            document.getElementById("plataforma").selectedIndex=0;
            document.getElementById("order").selectedIndex=0;

            if(e.target.value != ""){
                if(e.target.value=="todo"){
                    db.obtenerGames();
                }else {
                    db.queryGamesOption(e.target.value);
                }
            }else{
                db.obtenerGames();
            }

        },
        false
    )

    document.getElementById("todos").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("option").selectedIndex=0;
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

    document.getElementById("searchs").addEventListener(
        "keyup",
        (e) => {
                document.getElementById("search").classList.remove("hint");
                document.getElementById("order").selectedIndex=0;
                document.getElementById("plataforma").selectedIndex=0;
                document.getElementById("option").selectedIndex=0;
                db.queryGamesSearch(e.target.value);
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

    document.getElementById("todosDLC").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("option").selectedIndex=2;
            db.queryGamesOption("DLC");
        },
        false
    )

    document.getElementById("todosJuegos").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("option").selectedIndex=3;
            db.queryGamesOption("Juego");
        },
        false
    )


    document.getElementById("todoRecientes").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("order").selectedIndex=6;
            db.queryGames("descripcion.fechaLanzamiento:desc");
        },
        false
    )


    document.getElementById("todoDescuentos").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("order").selectedIndex=4;
            db.queryGames("descuento:desc");
        },
        false
    )

    document.getElementById("DlcRecientes").addEventListener(
        "click",
        (e) => {

            document.getElementById("search").classList.remove("hint");
            document.getElementById("option").selectedIndex=2;
            db.queryGamesOption("DLC");
        },
        false
    )







}