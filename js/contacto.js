const formulario =
    document.getElementById(
        "formContacto"
    );


if (formulario) {

    formulario.addEventListener(
        "submit",
        validarFormulario
    );

}


function validarFormulario(event) {

    event.preventDefault();


    let valido = true;


    const nombre =
        document.getElementById(
            "nombre"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const asunto =
        document.getElementById(
            "asunto"
        ).value.trim();


    const mensaje =
        document.getElementById(
            "mensaje"
        ).value.trim();


    limpiarErrores();


    if (nombre === "") {

        mostrarError(
            "errorNombre",
            "El nombre es obligatorio."
        );

        valido = false;

    }


    const patronEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        mostrarError(
            "errorEmail",
            "El correo es obligatorio."
        );

        valido = false;

    } else if (
        !patronEmail.test(email)
    ) {

        mostrarError(
            "errorEmail",
            "El correo no es válido."
        );

        valido = false;

    }


    if (asunto === "") {

        mostrarError(
            "errorAsunto",
            "El asunto es obligatorio."
        );

        valido = false;

    }


    if (mensaje === "") {

        mostrarError(
            "errorMensaje",
            "El mensaje es obligatorio."
        );

        valido = false;

    }


    if (valido) {

        document.getElementById(
            "mensajeExito"
        ).style.display = "block";


        formulario.reset();


        setTimeout(() => {

            document.getElementById(
                "mensajeExito"
            ).style.display = "none";

        }, 5000);

    }

}


function mostrarError(elemento, texto) {

    document.getElementById(
        elemento
    ).textContent = texto;

}


function limpiarErrores() {

    document
        .querySelectorAll(
            ".form-group small"
        )
        .forEach(elemento => {

            elemento.textContent = "";

        });

}