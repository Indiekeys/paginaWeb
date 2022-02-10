"use strict";
//Se importan dependencias
import * as script from "./firebase_auth.js";
import * as db from "./firestore.js";

window.onload = async () => {
  //Se comprueba si esta iniciada la sesión o no.
  script.comprobarAuth();
  //Se obtiene el id del juego de la URL
  let url = window.location.href
    .split("/")
    [window.location.href.split("/").length - 1].split("-")[0];
  //Se obtiene el juego de la base de datos, si sucede algún error, la función redirige a la página de error.
  await db.obtenerGame(url);

  //Se crea un eventlistener en el cual al realizar clic se cierra la sesión.
  document.getElementById("log_out").addEventListener(
    "click",
    () => {
      script.log_out();
      document.getElementById("imgAvatar").innerHTML = "";
    },
    false
  );
  //Se crea un eventlistener en el cual al realizar clic se muestra un submenu con el avatar del usuario.
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
};
