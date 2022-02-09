"use strict";
import {
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  deleteUser,
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
    updateProfile(this.auth.currentUser, {
      displayName: nombre + " " + apellidos,
    }).catch(() => {});
  }

  getEmail() {
    return this.auth.currentUser.email;
  }

  isVerified() {
    return this.auth.currentUser.emailVerified;
  }

  getPhoneNumber() {
    return this.auth.currentUser.phoneNumber;
  }

  setPhoneNumber(phoneNumber) {
    updateProfile(this.auth.currentUser, {
      phoneNumber: phoneNumber,
    });
  }

  getPhotoURL() {
    return this.auth.currentUser.photoURL;
  }

  getProviderId() {
    return this.auth.currentUser.providerData[0].providerId;
  }

  setPhotoURL(photoURL) {
    updateProfile(this.auth.currentUser, {
      photoURL: photoURL,
    }).catch(() => {});
  }

  updatePassword(password, newPassword, newPassword2) {
    this.reauthenticateUser(password)
      .then(() => {
        if (password === newPassword) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "La contraseña no puede ser la misma que la anterior",
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (newPassword !== newPassword2) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Las nuevas contraseñas no coinciden",
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (newPassword.length < 6) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "La nueva contraseña debe tener al menos 6 caracteres",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          updatePassword(this.auth.currentUser, newPassword)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Contraseña actualizada correctamente",
                showConfirmButton: false,
                timer: 2000,
              });
            })
            .catch(() => {
              Swal.fire({
                position: "top",
                icon: "error",
                title: "Error al actualizar la contraseña",
                showConfirmButton: false,
                timer: 2000,
              });
            });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: REAUTHENTICATE_ERRORS[error.code] || "Error al reautenticar",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  deleteAccount(){
    deleteUser(this.auth.currentUser).then(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cuenta eliminada correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.assign("/");
          }, 2000);
        }
    ).catch(
        () => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al eliminar la cuenta",
            showConfirmButton: false,
            timer: 2000,
          });
        }
    );
  }

  reauthenticateUser(password) {
    const credential = EmailAuthProvider.credential(
      this.auth.currentUser.email,
      password
    );
    return reauthenticateWithCredential(this.auth.currentUser, credential);
  }
}

const REAUTHENTICATE_ERRORS = {
  "auth/user-mis-match": "Las credenciales no coinciden",
  "auth/user-not-found": "El usuario no existe",
  "auth/invalid-credential": "La credencial no es válida",
  "auth/invalid-email": "El email no es válido",
  "auth/wrong-password": "La contraseña actual no es correcta",
  "auth/invalid-verification-id": "El ID de verificación no es válido",
  "auth/invalid-verification-code": "El código de verificación no es válido",
};
