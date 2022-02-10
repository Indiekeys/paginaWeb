"use strict";
//Se importan las dependencias.
import * as plantillas from "./print.js";
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { Usuario } from "./Usuario.js";

//Se declaran las constantes a utilizar.
const auth = getAuth(app);
const db = getFirestore(app);
const games = collection(db, "games");
const wishlist = collection(db, "wishlist");
const user = new Usuario(auth);

//Se crea una función la cual obtiene los juegos por fecha.
export const gamesDate = async () => {
  let date = new Date();

  const consulta = await query(
    games,
    where("descripcion.fechaLanzamiento", "<=", date),
    limit(10),
    orderBy("descripcion.fechaLanzamiento", "desc")
  );
  let obtainGames = await getDocs(consulta);

  obtainGames.docs.map((documento) => {
    if (documento.data().descripcion.Tipo === "Juego") {
      document.getElementById("juegos").innerHTML +=
        plantillas.printGames(documento);
    } else {
      document.getElementById("juegos").innerHTML +=
        plantillas.printDLC(documento);
    }
  });
};

//Función que obtiene los DLC y solo devuelve un máximo de 5.
export const obtenerDlc = async () => {
  const consulta = await query(
    games,
    where("descripcion.Tipo", "==", "DLC"),
    limit(5)
  );
  let obtainGames = await getDocs(consulta);

  obtainGames.docs.map((documento) => {
    document.getElementById("DLC").innerHTML += plantillas.printDLC(documento);
  });
};

export const obtenerMasDescuento = async () => {
  const consulta = await query(
    games,
    where("descuento", "<=", 100),
    limit(5),
    orderBy("descuento", "desc")
  );
  let obtainGames = await getDocs(consulta);

  obtainGames.docs.map((documento) => {
    if (documento.data().descripcion.Tipo == "Juego") {
      document.getElementById("juegosDescuento").innerHTML +=
        plantillas.printGames(documento);
    } else {
      document.getElementById("juegosDescuento").innerHTML +=
        plantillas.printDLC(documento);
    }
  });
};

export const obtenerGames = async () => {
  let obtainGames = await getDocs(games);
  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById(
    "ig-panel-center"
  ).innerHTML = `<div class="basic-panel products-trending" id="juegos"></div>`;

  obtainGames.docs.map((documento) => {
    if (documento.data().descripcion.Tipo == "Juego") {
      document.getElementById("juegos").innerHTML +=
        plantillas.printGames(documento);
    } else {
      document.getElementById("juegos").innerHTML +=
        plantillas.printDLC(documento);
    }
  });
};

export const obtenerGame = async (juego) => {
  let game = await doc(games, juego);
  let obtainGames = await getDoc(game);
  if (obtainGames.exists()) {
    document.getElementById("game").innerHTML = "";
    document.getElementById("game").innerHTML +=
      plantillas.printGame(obtainGames);
  } else {
    window.location.assign("/404");
  }
};

export const queryGames = async (querys) => {
  let select = querys.split(":");

  const consulta = await query(games, orderBy(select[0], select[1]));
  let obtainGames = await getDocs(consulta);

  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById(
    "ig-panel-center"
  ).innerHTML = `<div class="basic-panel products-trending" id="juegos"></div>`;

  obtainGames.docs.map((documento) => {
    if (documento.data().descripcion.Tipo == "Juego") {
      document.getElementById("juegos").innerHTML +=
        plantillas.printGames(documento);
    } else {
      document.getElementById("juegos").innerHTML +=
        plantillas.printDLC(documento);
    }
  });
};

export const queryGamesPlatform = async (querys) => {
  const consulta = await query(games, where("plataforma", "==", querys));
  let obtainGames = await getDocs(consulta);

  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById(
    "ig-panel-center"
  ).innerHTML = `<div class="basic-panel products-trending" id="juegos"></div>`;
  if (obtainGames.size == 0) {
    document.getElementById("juegos").innerHTML += plantillas.printNoGame();
  } else {
    obtainGames.docs.map((documento) => {
      if (documento.data().descripcion.Tipo == "Juego") {
        document.getElementById("juegos").innerHTML +=
          plantillas.printGames(documento);
      } else {
        document.getElementById("juegos").innerHTML +=
          plantillas.printDLC(documento);
      }
    });
  }
};

export const queryGamesOption = async (querys) => {
  const consulta = await query(games, where("descripcion.Tipo", "==", querys));
  let obtainGames = await getDocs(consulta);

  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById(
    "ig-panel-center"
  ).innerHTML = `<div class="basic-panel products-trending" id="juegos"></div>`;

  if (obtainGames.size == 0) {
    document.getElementById("juegos").innerHTML += plantillas.printNoGame();
  } else {
    obtainGames.docs.map((documento) => {
      if (documento.data().descripcion.Tipo == "Juego") {
        document.getElementById("juegos").innerHTML +=
          plantillas.printGames(documento);
      } else {
        document.getElementById("juegos").innerHTML +=
          plantillas.printDLC(documento);
      }
    });
  }
};

export const queryGamesSearch = async (querys) => {
  const consulta = await query(games, where("nombre", ">=", querys));
  let obtainGames = await getDocs(consulta);

  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById(
    "ig-panel-center"
  ).innerHTML = `<div class="basic-panel products-trending" id="juegos"></div>`;

  if (obtainGames.size == 0) {
    document.getElementById("juegos").innerHTML += plantillas.printNoGame();
  } else {
    obtainGames.docs.map((documento) => {
      if (documento.data().descripcion.Tipo == "Juego") {
        document.getElementById("juegos").innerHTML +=
          plantillas.printGames(documento);
      } else {
        document.getElementById("juegos").innerHTML +=
          plantillas.printDLC(documento);
      }
    });
  }
};

export const crearWishlist = () => {
  onAuthStateChanged(auth, async (usuario) => {
    if (usuario !== null) {
      const consulta = await query(
        wishlist,
        where("uidUser", "==", user.getUID())
      );
      let obtainWishlist = await getDocs(consulta);
      if (obtainWishlist.size === 0) {
        await addDoc(wishlist, {
          uidUser: user.getUID(),
          juegos: [],
        });
      }
    }
  });
};

export const eliminarWishlist = async () => {
  const consulta = await query(wishlist, where("uidUser", "==", user.getUID()));
  let obtainWishlist = await getDocs(consulta);
  await deleteDoc(doc(wishlist, obtainWishlist.docs[0].id));
};

export const addGameToWishlist = (idGame) => {};
