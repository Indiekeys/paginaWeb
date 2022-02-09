"use strict";

export function validacionPass(pass,pass2){
   return pass === pass2;
}

export function printLogIn(){

      document.getElementById("log_out").classList.add("d-none");
      document.getElementById("cuenta").classList.add("d-none");
      document.getElementById("login").classList.remove("d-none");
      document.getElementById("register").classList.remove("d-none");
}

export function printLogOut(){

      document.getElementById("log_out").classList.remove("d-none");
      document.getElementById("cuenta").classList.remove("d-none");
      document.getElementById("login").classList.add("d-none");
      document.getElementById("register").classList.add("d-none");

}
