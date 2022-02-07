import * as plantillas from "./print.js";
import { app } from "./firebase.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    doc,
    query,
    where,
    orderBy,
    limit,
    increment,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

const db = getFirestore(app);
const games = collection(db,"games");

export const gamesDate = async () => {
    let date = new Date();

    const consulta = await query(

        games,
        where("descripcion.fechaLanzamiento", "<=", date),
        limit(10),
        orderBy("descripcion.fechaLanzamiento", "desc"),
    );
    let obtainGames = await getDocs(consulta);

    obtainGames.docs.map((documento) => {
        document.getElementById("juegos").innerHTML += plantillas.printGames(documento);

    });
};

export const obtenerDlc = async () => {

    const consulta = await query(

        games,
        where("descripcion.Tipo", "==", "DLC"),
        limit(5),
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
        limit(10),
        orderBy("descuento", "desc"),
    );
    let obtainGames = await getDocs(consulta);

    obtainGames.docs.map((documento) => {
        document.getElementById("juegosDescuento").innerHTML += plantillas.printGames(documento);

    });
};

export const obtenerGames = async () => {
    let obtainGames = await getDocs(games);
    document.getElementById("juegos").innerHTML ="";

    obtainGames.docs.map((documento) => {
        document.getElementById("juegos").innerHTML += plantillas.printGames(documento);

    });
};

export const obtenerGame = async (juego) => {
    let game = await doc(games,juego);
    let obtainGames = await getDoc(game);
    if(obtainGames.exists()) {
        document.getElementById("game").innerHTML = "";
        document.getElementById("game").innerHTML += plantillas.printGame(obtainGames);
    }else{
        window.location.assign("/404");
    }
};
