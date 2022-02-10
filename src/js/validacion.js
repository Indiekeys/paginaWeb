"use strict";
//Se crea una función la cual recibe como parámetro dos contraseñas, las cuales si son iguales, retorna true, de lo contrario, retorna false.
export function validacionPass(pass, pass2) {
  return pass === pass2;
}
//Se crea una función printLogIn la cual imprime el LogIn del usuario en el nav.
export function printLogIn() {
  document.getElementById("log_out").classList.add("d-none");
  document.getElementById("cuenta").classList.add("d-none");
  document.getElementById("login").classList.remove("d-none");
  document.getElementById("register").classList.remove("d-none");
  document.getElementById("listaDeseados").classList.add("d-none");
}

//Se crea una función printLogOut la cual imprime el LogOut del usuario en el nav.
export function printLogOut() {
  document.getElementById("log_out").classList.remove("d-none");
  document.getElementById("cuenta").classList.remove("d-none");
  document.getElementById("login").classList.add("d-none");
  document.getElementById("register").classList.add("d-none");
  document.getElementById("listaDeseados").classList.remove("d-none");
}
