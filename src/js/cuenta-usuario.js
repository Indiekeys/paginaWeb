"use strict";
//Se importan las dependencias.
import {app} from './firebase.js';
import {getAuth } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {Usuario} from './Usuario.js';
import {isNotLoggedIn,log_out,comprobarAuth} from './firebase_auth.js';
import {eliminarWishlist} from './firestore.js';
window.onload = () => {
    //Se obtiene el auth y se crea un usuario.
    const auth = getAuth(app);
    const user = new Usuario(auth);
    //Se comprueba si esta logueado y también si no lo esta.
    comprobarAuth();
    isNotLoggedIn();

    /**
     * Se crea un eventlistener para cuando el usuario realice clic al botón de eliminar cuenta
     * se realiza una comprobación antes de la eliminación. Cuando se elimine correctamente
     * se eliminara la wishlist y se redirigirá al index.
     */
    document.getElementById("deleteAccount").addEventListener(
        "click",
        async (e) => {
            e.preventDefault();
            if(await user.getProviderId() === "password"){
                const { value: password } = await Swal.fire({
                    title: 'Ingrese su contraseña para eliminar su cuenta',
                    input: 'password',
                    inputPlaceholder: 'Contraseña',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        autocomplete: 'off'
                    },
                    showConfirmButton: true,
                    confirmButtonText: 'Eliminar',
                });
                user.reauthenticateUser(password).then(async () => {
                    await eliminarWishlist();
                    await user.deleteAccount();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseña incorrecta',
                        text: 'Por favor, ingrese la contraseña correcta para eliminar su cuenta',
                        showConfirmButton: false,
                        timer: 2000
                    });
                });
            }else{
                const { value: email } = await Swal.fire({
                    title: 'Ingrese su correo electrónico para eliminar su cuenta',
                    input: 'email',
                    inputPlaceholder: 'Correo electrónico',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        autocomplete: 'off'
                    },
                    showConfirmButton: true,
                    confirmButtonText: 'Eliminar',
                });

                if(email === user.getEmail()){
                    await eliminarWishlist();
                    await user.deleteAccount();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Correo electrónico incorrecto',
                        text: 'Por favor, ingrese el correo electrónico correcto para eliminar su cuenta',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }

        },
        false
    );

    /**
     * Se crea un eventlistener para cuando el usuario haga clic para cambiar la contraseña,
     * se pida la contraseña actual y se le pedirá la nueva contraseña. Si todo está bien se cambiara,
     * si no se mostrará un mensaje de error.
     */
    document.getElementById("cambiarContra").addEventListener(
        "click",
        async (e) => {
            e.preventDefault();
            user.updatePassword(
                document.getElementById("ik-pass1").value,
                document.getElementById("ik-pass2").value,
                document.getElementById("ik-pass3").value
            )
        },
    )


    //Se crea un eventlistener para cuando el usuario haga clic en el botón de cerrar sesión, se cierre la sesión.
    document.getElementById("log_out").addEventListener(
        "click",
        async () => {
            await log_out();
            document.getElementById("imgAvatar").innerHTML="";
        },
        false
    )

    //Se crea un eventlistener para cuando el usuario haga clic sobre el avatar, se muestre un menú desplegable.
    document.getElementById("avatar").addEventListener(
        "click",
        () => {
            if(document.getElementById("submenu").classList.contains("block")){
                document.getElementById("avatar").classList.remove("active");
                document.getElementById("submenu").classList.add("none");
                document.getElementById("submenu").classList.remove("block");
            }else{
                document.getElementById("avatar").classList.add("active");
                document.getElementById("submenu").classList.remove("none");
                document.getElementById("submenu").classList.add("block");
            }

        },
        false
    )


}