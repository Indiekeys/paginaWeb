"use strict";
//Se importa el módulo de express para crear el servidor web con routes.
const express = require("express");
const app = express();
//Se crea una variable la cual almacena el puerto por el cual se va a ejecutar el servidor.
const port = 8080;
//Hacemos público los assets y el src, para que los js y css puedan ser accesibles.
app.use("/assets", express.static("assets"));
app.use("/src", express.static("src"));

//Se crea la ruta / que envía la página index.html.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/paginas/index.html");
});

//Se crea la ruta /login la cual envía la página login.html.
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/paginas/login.html");
});

//Se crea la ruta /register la cual envía la página register.html.
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/paginas/register.html");
});

//Se crea la ruta /recovery-password la cual envía la página recovery-password.html.
app.get("/recovery-password", (req, res) => {
  res.sendFile(__dirname + "/paginas/recovery-password.html");
});

//Se crea la ruta /lista-deseados la cual envía la página wishList.html.
app.get("/lista-deseados", (req, res) => {
  res.sendFile(__dirname + "/paginas/wishList.html");
});


/**
 * Se crea una ruta llamada /game/:id la cual envía la página game.html, el id es un parámetro que se recibe en la url.
 */
app.get("/game/:id", (req, res) => {
  res.sendFile(__dirname + "/paginas/juego.html");
});

//Se crea una ruta llamada /mi-cuenta la cual envía la página miCuenta.html.
app.get("/mi-cuenta", (req, res) => {
  res.sendFile(__dirname + "/paginas/miCuenta.html");
});

//Cuando surja un error 404, se envía la página 404.html. Esto sucederá cuando intentemos entrar a una URL no existente.
app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/paginas/404.html");
});

//Se inicializa la aplicación por el puerto mencionado en la variable port.
app.listen(port);
