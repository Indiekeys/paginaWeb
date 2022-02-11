"use strict";
import * as script from "../firebase/firebase_auth.js";
import * as db from "../firebase/firestore.js";


window.onload = () => {
    //Se comprueba si esta iniciada la sesión o no.
    script.comprobarAuth();
    script.wishList();

    //Se crea un eventlistener en el botón de log_out, cuando se haga clic, se cerrara la sesión.
    document.getElementById("log_out").addEventListener(
        "click",
        (e) => {
            script.log_out();
            window.location.assign("/");
        },
        false
    );

    //Se crea un eventlistener en el cual al realizar clic en avatar, se muestra el menú de opciones.
    document.getElementById("avatar").addEventListener(
        "click",
        () => {
            if (document.getElementById("submenu").classList.contains("block")) {
                document.getElementById("avatar").classList.remove("active");
                document.getElementById("submenu").classList.add("none");
                document.getElementById("submenu").classList.remove("block");
            } else {
                document.getElementById("avatar").classList.add("active");
                document.getElementById("submenu").classList.remove("none");
                document.getElementById("submenu").classList.add("block");
            }
        },
        false
    );

    //Se crea un eventlistener en el cual al realizar clic en el botón de añadir a la wishlist se añade el juego a la wishlist del usuario o se remueve.
    document.addEventListener(
        "click",
        async (e) => {
            if (e.target.id == "remove") {
                await db.removeGameToWishlist(e.target.name);
                db.obtenerWishList();

            }
        },
        false
    );



};
