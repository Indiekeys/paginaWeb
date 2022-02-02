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

export const obtenerGames = async () => {
    let obtainGames = await getDocs(games);
    document.getElementById("ig-panel-center").innerHTML ="";

    obtainGames.docs.map((documento) => {
        document.getElementById("ig-panel-center").innerHTML += plantillas.printGames(documento);

    });
};
