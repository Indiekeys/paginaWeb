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
    arrayRemove,
    doc,
    query,
    where,
    orderBy,
    limit,
    increment,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {Usuario} from "./Usuario.js";

const auth = getAuth(app);
const db = getFirestore(app);
const games = collection(db,"games");
const wishlist = collection(db,"wishlist");
const user = new Usuario(auth);

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
        if(documento.data().descripcion.Tipo=="Juego") {
            document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
        }else{
            document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
        }

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
        limit(5),
        orderBy("descuento", "desc"),
    );
    let obtainGames = await getDocs(consulta);

    obtainGames.docs.map((documento) => {
        if(documento.data().descripcion.Tipo=="Juego") {
            document.getElementById("juegosDescuento").innerHTML += plantillas.printGames(documento);
        }else{
            document.getElementById("juegosDescuento").innerHTML += plantillas.printDLC(documento);
        }

    });
};

export const obtenerGames = async () => {
    let obtainGames = await getDocs(games);
    document.getElementById("ig-panel-center").innerHTML ="";
    document.getElementById("ig-panel-center").innerHTML =`<div class="basic-panel products-trending" id="juegos"></div>`;


    obtainGames.docs.map((documento) => {
        if(documento.data().descripcion.Tipo=="Juego") {
            document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
        }else{
            document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
        }
    });
};

export const obtenerGame = async (juego) => {
    let game = await doc(games,juego);
    let obtainGames = await getDoc(game);
    let auth;
    let wishList;
    let estar=false;

    try {
        auth = user.getUID();
        const consulta = await query(
            wishlist,
            where("uidUser","==",auth),

        );

        wishList = await getDocs(consulta);

    }catch (error){
        auth = null;
        wishList = null;
        estar = false;
    }

        if (obtainGames.exists()) {
            if(wishList !== null) {
                wishList.docs[0].data().juegos.map((documento) => {

                    if (documento.nombre === obtainGames.data().nombre) {
                        estar = true;
                    }

                });
            }

            document.getElementById("game").innerHTML = "";
            document.getElementById("game").innerHTML += plantillas.printGame(obtainGames, auth, estar);
        } else {
            window.location.assign("/404");
        }

};

export const queryGames = async (querys) => {

    let select = querys.split(":");

    const consulta = await query(
        games,
        orderBy(select[0], select[1]),
    );
    let obtainGames = await getDocs(consulta);

    document.getElementById("ig-panel-center").innerHTML ="";
    document.getElementById("ig-panel-center").innerHTML =`<div class="basic-panel products-trending" id="juegos"></div>`;

    obtainGames.docs.map((documento) => {
        if(documento.data().descripcion.Tipo=="Juego") {
            document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
        }else{
            document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
        }

    });
};

export const queryGamesPlatform = async (querys) => {


    const consulta = await query(
        games,
        where("plataforma","==",querys),

    );
    let obtainGames = await getDocs(consulta);

    document.getElementById("ig-panel-center").innerHTML ="";
    document.getElementById("ig-panel-center").innerHTML =`<div class="basic-panel products-trending" id="juegos"></div>`;
    if(obtainGames.size==0){

        document.getElementById("juegos").innerHTML += plantillas.printNoGame();

    }else {

        obtainGames.docs.map((documento) => {

            if (documento.data().descripcion.Tipo == "Juego") {
                document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
            } else {
                document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
            }

        });
    }
};

export const queryGamesOption = async (querys) => {


    const consulta = await query(
        games,
        where("descripcion.Tipo","==",querys),

    );
    let obtainGames = await getDocs(consulta);

    document.getElementById("ig-panel-center").innerHTML ="";
    document.getElementById("ig-panel-center").innerHTML =`<div class="basic-panel products-trending" id="juegos"></div>`;

    if(obtainGames.size==0){

        document.getElementById("juegos").innerHTML += plantillas.printNoGame();

    }else {

        obtainGames.docs.map((documento) => {

            if (documento.data().descripcion.Tipo == "Juego") {
                document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
            } else {
                document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
            }

        });
    }
};

export const queryGamesSearch = async (querys) => {


    const consulta = await query(
        games,
        where("nombre",">=",querys),

    );
    let obtainGames = await getDocs(consulta);

    document.getElementById("ig-panel-center").innerHTML ="";
    document.getElementById("ig-panel-center").innerHTML =`<div class="basic-panel products-trending" id="juegos"></div>`;

    if(obtainGames.size==0){

        document.getElementById("juegos").innerHTML += plantillas.printNoGame();

    }else {

        obtainGames.docs.map((documento) => {

            if (documento.data().descripcion.Tipo == "Juego") {
                document.getElementById("juegos").innerHTML += plantillas.printGames(documento);
            } else {
                document.getElementById("juegos").innerHTML += plantillas.printDLC(documento);
            }

        });
    }
};


export const crearWishlist = () => {
    onAuthStateChanged(auth, async (usuario) => {
        if(usuario !== null){
            await addDoc(wishlist, {
                uidUser: user.getUID(),
                juegos: []
            });
        }
    });
}

export const addGameToWishlist = async (idGame) => {

    const consulta = await query(
        wishlist,
        where("uidUser","==",user.getUID()),

    );

    let wishList = await getDocs(consulta);
    let pruebaRef = await doc(wishlist,wishList.docs[0].id);
    let pruebaRef2 = await doc(games,idGame);
    const juegos = await getDoc(pruebaRef2);

    await updateDoc(pruebaRef, {
        juegos: arrayUnion(juegos.data()),
    });

}

export const removeGameToWishlist = async (idGame) => {

    const consulta = await query(
        wishlist,
        where("uidUser","==",user.getUID()),

    );

    let wishList = await getDocs(consulta);
    let pruebaRef = await doc(wishlist,wishList.docs[0].id);
    let pruebaRef2 = await doc(games,idGame);
    const juegos = await getDoc(pruebaRef2);

    await updateDoc(pruebaRef, {
        juegos: arrayRemove(juegos.data()),
    });

}

//Función que añade un producto a un carrito.
export const actualizarProductosCarrito = async (id,dato) => {

    const pruebaRef = await doc(coleccion_carrito, id);
    const carrito = await getDoc(pruebaRef);
    let productos = await doc(coleccion,dato);
    const datos = await getDoc(productos);
    const array = carrito.data().productos;
    if(!Array.isArray(array)){
        await updateDoc(pruebaRef, {
            productos: arrayUnion(dato),
            peso: increment(datos.data().peso),
            precio: increment(datos.data().precio),
        });

    }else {
        if (!array.includes(dato)) {
            await updateDoc(pruebaRef, {
                productos: arrayUnion(dato),
                peso: increment(datos.data().peso),
                precio: increment(datos.data().precio),

            });
        }
    }
    obtenerCarrito(document.getElementById("select_carrito").value);
};