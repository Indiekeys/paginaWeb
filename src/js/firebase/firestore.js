"use strict";
//Se importan las dependencias.
import * as plantillas from "../plantillas/print.js";
import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import { Usuario } from "../clases/Usuario.js";
import {printNoGame, printNoGameWish} from "../plantillas/print.js";

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

//Función que imprime cinco juegos ordenados por más descuento.
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
//Función que obtiene todos los juegos y los imprime.
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
//Función que obtiene un juego.
export const obtenerGame = async (juego) => {
  let game = await doc(games, juego);
  let obtainGames = await getDoc(game);
  let auth;
  let wishList;
  let estar = false;

  try {
    auth = user.getUID();
    const consulta = await query(wishlist, where("uidUser", "==", auth));
    wishList = await getDocs(consulta);
  } catch (error) {
    auth = null;
    wishList = null;
    estar = false;
  }

  if (obtainGames.exists()) {
    if (wishList !== null) {
      wishList.docs[0].data().juegos.map((documento) => {
        if (documento.nombre === obtainGames.data().nombre) {
          estar = true;
        }
      });
    }

    document.getElementById("game").innerHTML = "";
    document.getElementById("game").innerHTML += plantillas.printGame(
      obtainGames,
      auth,
      estar
    );
  } else {
    window.location.assign("/404");
  }
};
//Función que sirve para realizar una query a la base de datos y obtener juegos.
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

//Función para realizar una consulta a la base de datos y obtener juegos por plataforma.
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

//Función que realiza una query a la base de datos dependiendo de la opción.
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
//Función que filtra los juegos por nombre.
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
/**
 * Función que crea una wishlist, la cual almacena los juegos y una referencia del usuario al que le pertenece.
 * Si el usuario ya tiene una wishlist, no se creara.
 */
export const crearWishlist = async () => {
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
//Función que elimina la wishlist del usuario.
export const eliminarWishlist = async () => {
  const consulta = await query(wishlist, where("uidUser", "==", user.getUID()));
  let obtainWishlist = await getDocs(consulta);
  await deleteDoc(doc(wishlist, obtainWishlist.docs[0].id));
};

//Función que recibe el id de un videojuego y lo añade a la wishlist.
export const addGameToWishlist = async (idGame) => {
  const consulta = await query(wishlist, where("uidUser", "==", user.getUID()));

  let wishList = await getDocs(consulta);
  let pruebaRef = await doc(wishlist, wishList.docs[0].id);
  let pruebaRef2 = await doc(games, idGame);
  const juegos = await getDoc(pruebaRef2);

  await updateDoc(pruebaRef, {
    juegos: arrayUnion(juegos.data()),
  });
};

//Función que recibe el id de un videojuego y lo elimina de la wishlist.
export const removeGameToWishlist = async (idGame) => {
  const consulta = await query(wishlist, where("uidUser", "==", user.getUID()));
  let wishList = await getDocs(consulta);
  let pruebaRef = await doc(wishlist, wishList.docs[0].id);
  let pruebaRef2 = await doc(games, idGame);
  const juegos = await getDoc(pruebaRef2);

  await updateDoc(pruebaRef, {
    juegos: arrayRemove(juegos.data()),
  });
};

//Función que recibe el id de un videojuego y lo elimina de la wishlist.
export const obtenerWishList = async () => {

  const consulta = await query(wishlist, where("uidUser", "==", user.getUID()));
  let wishList = await getDocs(consulta);

  document.getElementById("ig-panel-center").innerHTML = "";
  document.getElementById("ig-panel-center").innerHTML = "<div class='wishlist basic-panel products-trending' id='wish'><h2>LISTA DE DESEADOS</h2></div>";
  if(wishList.docs[0].data().juegos.length === 0){

    document.getElementById("wish").innerHTML += printNoGameWish();

  }else{

    wishList.docs[0].data().juegos.map(async (documento) => {

      let consultaId = await query(games, where("nombre", "==", documento.nombre));
      let id = await getDocs(consultaId);

      if(documento.descripcion.Tipo=="DLC") {
        document.getElementById("wish").innerHTML += plantillas.printDLCWish(documento,id.docs[0].id);
      }else{
        document.getElementById("wish").innerHTML += plantillas.printGamesWish(documento,id.docs[0].id);
      }

    });

  }


};

