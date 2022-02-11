"use strict";
import * as script from "../firebase/firebase_auth.js";
import * as db from "../firebase/firestore.js";

window.onload = () => {
  //Se comprueba el auth del usuario.
  script.comprobarAuth();
  //Se obtienen los datos de los juegos;
  db.gamesDate();
  //Se obtienen los datos de los juegos con más descuentos;
  db.obtenerMasDescuento();
  //Se obtienen los datos de los DLC de los juegos.
  db.obtenerDlc();

  //Se crea un eventlistener en el botón de log_out, cuando se haga clic, se cerrara la sesión.
  document.getElementById("log_out").addEventListener(
    "click",
    (e) => {
      script.log_out();
      window.location.assign("/");
    },
    false
  );

  //Se crea un eventlistener en el cual al cambiar de plataforma se obtendrán los juegos de esa plataforma.
  document.getElementById("plataforma").addEventListener(
    "change",
    (e) => {
      document.getElementById("order").selectedIndex = 0;
      document.getElementById("option").selectedIndex = 0;

      if (!e.target.value == "") {
        db.queryGamesPlatform(e.target.value);
      } else {
        db.obtenerGames();
      }
    },
    false
  );

  //Se crea un eventlistener en el cual al cambiar de orden se realizara una query en la base de datos, para obtener los juegos.
  document.getElementById("order").addEventListener(
    "change",
    (e) => {
      document.getElementById("plataforma").selectedIndex = 0;
      document.getElementById("option").selectedIndex = 0;

      if (!e.target.value == "") {
        db.queryGames(e.target.value);
      } else {
        db.obtenerGames();
      }
    },
    false
  );

  //Se crea un eventlistener en el cual al cambiar de opción se realizara una query en la base de datos, para obtener los juegos.
  document.getElementById("option").addEventListener(
    "change",
    (e) => {
      document.getElementById("plataforma").selectedIndex = 0;
      document.getElementById("order").selectedIndex = 0;

      if (e.target.value != "") {
        if (e.target.value === "todo") {
          db.obtenerGames();
        } else {
          db.queryGamesOption(e.target.value);
        }
      } else {
        db.obtenerGames();
      }
    },
    false
  );

  //Se crea un eventlistener en el cual al realizar clic, se obtienen todos los juegos.
  document.getElementById("todos").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("option").selectedIndex = 0;
      db.obtenerGames();
    },
    false
  );

  //Se crea un eventlistener en el cual al realizar clic sobre el target botonJuegos, el orden se pone en el index 0 y la plataforma también.Se obtienen los juegos.
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.id === "botonJuegos") {
        document.getElementById("order").selectedIndex = 0;
        document.getElementById("plataforma").selectedIndex = 0;
        db.obtenerGames();
      }
    },
    false
  );
  //Se crea un eventlistener en el cual al realizar una búsqueda se hace una query del juego.
  document.getElementById("searchs").addEventListener(
    "keyup",
    (e) => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("order").selectedIndex = 0;
      document.getElementById("plataforma").selectedIndex = 0;
      document.getElementById("option").selectedIndex = 0;
      db.queryGamesSearch(e.target.value);
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

  //Se crea un eventlistener en el cual al realizar clic en todosDLC, se obtienen todos los DLC.
  document.getElementById("todosDLC").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("option").selectedIndex = 2;
      db.queryGamesOption("DLC");
    },
    false
  );

  //Se crea un eventlistener en el cual al realizar clic en todosJuegos, se obtienen todos los juegos.
  document.getElementById("todosJuegos").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("option").selectedIndex = 3;
      db.queryGamesOption("Juego");
    },
    false
  );

  //Se crea un eventlistener en el cual al realizar clic en todosRecientes, se obtienen todos los juegos recientes.
  document.getElementById("todoRecientes").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("order").selectedIndex = 6;
      db.queryGames("descripcion.fechaLanzamiento:desc");
    },
    false
  );
  //Se crea un eventlistener en el cual al realizar clic en todoDescuentos y se obtienen todos los juegos con descuento de forma descendente.
  document.getElementById("todoDescuentos").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("order").selectedIndex = 4;
      db.queryGames("descuento:desc");
    },
    false
  );
  //Se crea un eventlistener en DlcRecientes, cuando se hace clic, se hace una query para obtener los DLC.
  document.getElementById("DlcRecientes").addEventListener(
    "click",
    () => {
      document.getElementById("search").classList.remove("hint");
      document.getElementById("option").selectedIndex = 2;
      db.queryGamesOption("DLC");
    },
    false
  );
};
