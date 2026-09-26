let noticiasAdmin = [];


document.addEventListener(
    "DOMContentLoaded",
    inicializarAdmin
);


async function inicializarAdmin() {

    const guardadas =
        localStorage.getItem(
            "noticiasAdmin"
        );


    if (guardadas) {

        noticiasAdmin =
            JSON.parse(guardadas);

    } else {

        try {

            const respuesta =
                await fetch(
                    "data/noticias.json"
                );

            noticiasAdmin =
                await respuesta.json();

        } catch (error) {

            noticiasAdmin = [];

        }

    }


    mostrarTabla();


    document.getElementById(
        "btnNuevaNoticia"
    ).addEventListener(
        "click",
        mostrarFormulario
    );


    document.getElementById(
        "cancelarNoticia"
    ).addEventListener(
        "click",
        ocultarFormulario
    );


    document.getElementById(
        "formNoticia"
    ).addEventListener(
        "submit",
        crearNoticia
    );

}


function guardarNoticias() {

    localStorage.setItem(
        "noticiasAdmin",
        JSON.stringify(
            noticiasAdmin
        )
    );

}


function mostrarTabla() {

    const tabla =
        document.getElementById(
            "tablaNoticias"
        );


    tabla.innerHTML =
        noticiasAdmin.map(
            noticia => `

                <tr>

                    <td>
                        ${noticia.id}
                    </td>

                    <td>
                        ${noticia.titulo}
                    </td>

                    <td>
                        ${noticia.categoria}
                    </td>

                    <td>
                        ${noticia.fecha}
                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="eliminarNoticia(${noticia.id})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `
        ).join("");

}


function mostrarFormulario() {

    document.getElementById(
        "formularioAdmin"
    ).style.display = "block";

}


function ocultarFormulario() {

    document.getElementById(
        "formularioAdmin"
    ).style.display = "none";

}


function crearNoticia(event) {

    event.preventDefault();


    const titulo =
        document.getElementById(
            "titulo"
        ).value.trim();


    const categoria =
        document.getElementById(
            "categoria"
        ).value;


    const descripcion =
        document.getElementById(
            "descripcion"
        ).value.trim();


    const imagen =
        document.getElementById(
            "imagen"
        ).value.trim();


    if (
        !titulo ||
        !categoria ||
        !descripcion
    ) {

        alert(
            "Completa los campos obligatorios."
        );

        return;

    }


    const nuevoId =
        noticiasAdmin.length > 0
            ? Math.max(
                ...noticiasAdmin.map(
                    n => n.id
                )
            ) + 1
            : 1;


    const nuevaNoticia = {

        id: nuevoId,

        titulo: titulo,

        categoria: categoria,

        descripcion: descripcion,

        contenido: descripcion,

        imagen:
            imagen ||
            "https://via.placeholder.com/600x400?text=NewsWorld",

        fecha:
            new Date()
                .toISOString()
                .split("T")[0],

        autor: "Administrador"

    };


    noticiasAdmin.push(
        nuevaNoticia
    );


    guardarNoticias();

    mostrarTabla();

    document
        .getElementById(
            "formNoticia"
        )
        .reset();

    ocultarFormulario();


    alert(
        "Noticia creada correctamente."
    );

}


function eliminarNoticia(id) {

    const confirmar =
        confirm(
            "¿Deseas eliminar esta noticia?"
        );


    if (!confirmar) return;


    noticiasAdmin =
        noticiasAdmin.filter(
            noticia =>
                noticia.id !== Number(id)
        );


    guardarNoticias();

    mostrarTabla();

}