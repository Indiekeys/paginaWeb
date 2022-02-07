import * as script from "./firebase_auth.js";

window.onload = ()=>{

    script.hideLoginError();
    script.correctAuth();

    document.getElementById("sign_in").addEventListener(
        "submit",
        (e) => {
            e.preventDefault()
            let correo = document.getElementById("email").value;
            let pass = document.getElementById("pass").value;

                script.signAccount(correo,pass);
        },
        false
    )

    document.getElementById("google").addEventListener(
        "click",
        (e) => {

            script.authGoogle();
        },
        false
    )

    document.getElementById("facebook").addEventListener(
        "click",
        (e) => {

            script.authFacebook();
        },
        false
    )




}