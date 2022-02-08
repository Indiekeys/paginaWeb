"use strict";
import {
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
export class Usuario {
  constructor(auth) {
    this.auth = auth;
  }

  getUsuario() {
    return this.auth.currentUser;
  }

  getNombre() {
    return this.auth.currentUser.displayName;
  }

  setNombre(nombre, apellidos) {
    alert(nombre + " " + apellidos);
    updateProfile(this.auth.currentUser, {
      displayName: nombre + " " + apellidos,
    }).catch(() => {
    });
  }

  getEmail() {
    return this.auth.currentUser.email;
  }

  isVerified() {
    return this.auth.currentUser.emailVerified;
  }

  getPhoneNumber(){
    return this.auth.currentUser.phoneNumber;
  }

  setPhoneNumber(phoneNumber){
    updateProfile(this.auth.currentUser, {
      phoneNumber: phoneNumber,
    });
  }

  getPhotoURL() {
    return this.auth.currentUser.photoURL;
  }

  setPhotoURL(photoURL) {
    updateProfile(this.auth.currentUser, {
      photoURL: photoURL,
    }).catch(() => {
    });
  }




}
