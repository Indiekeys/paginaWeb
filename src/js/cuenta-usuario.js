"use strict";
import {app} from './firebase.js';
import {getAuth } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {Usuario} from './Usuario.js';
import {isNotLoggedIn,log_out,comprobarAuth} from './firebase_auth.js';

window.onload = () => {
    const auth = getAuth(app);
    const user = new Usuario(auth);
    comprobarAuth();
    isNotLoggedIn();

    document.getElementById("deleteAccount").addEventListener(
        "click",
        async (e) => {
            e.preventDefault();
            if(user.getProviderId() === "password"){
                const { value: password } = await Swal.fire({
                    title: 'Ingrese su contraseña para eliminar su cuenta',
                    input: 'password',
                    inputPlaceholder: 'Contraseña',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        autocomplete: 'off'
                    },
                });
                user.reauthenticateUser(password).then(() => {
                    user.deleteAccount();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseña incorrecta',
                        text: 'Por favor, ingrese la contraseña correcta para eliminar su cuenta',
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
                });

                email === user.getEmail() ? user.deleteAccount() : Swal.fire({
                    icon: 'error',
                    title: 'Correo electrónico incorrecto',
                    text: 'Por favor, ingrese el correo electrónico correcto para eliminar su cuenta',
                    timer: 2000
                });

            }

        },
        false
    );

    document.getElementById("log_out").addEventListener(
        "click",
        (e) => {
            log_out();
            document.getElementById("imgAvatar").innerHTML="";
        },
        false
    )

    document.getElementById("avatar").addEventListener(
        "click",
        (e) => {
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