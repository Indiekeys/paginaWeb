"use strict";

export class Alerta {
  constructor(mensaje) {
    this.mensaje = mensaje;
  }

  crearAlerta = (msg, type) => {
    let div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add(type);
    document.getElementById("alertas").appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 5000);
  }

  error() {
    this.crearAlerta(this.mensaje, "error");
  }

  success() {
    this.crearAlerta(this.mensaje, "success");
  }
}
