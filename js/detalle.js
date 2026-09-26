document.addEventListener(
    "DOMContentLoaded",
    cargarDetalle
);


async function cargarDetalle() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(parametros.get("id"));


    if (!id) {

        mostrarError();

        return;

    }


    try {

        const respuesta =
            await fetch("data/noticias.json");

        const noticias =
            await respuesta.json();


        const noticia =
            noticias.find(
                item => item.id === id
            );


        if (!noticia) {

            mostrarError();

            return;

        }


        mostrarDetalle(noticia);

    } catch (error) {

        console.error(error);

        mostrarError();

    }

}


function mostrarDetalle(noticia) {

    const contenedor =
        document.getElementById(
            "detalleNoticia"
        );


    const favorito =
        estaEnFavoritos(noticia.id);


    contenedor.innerHTML = `

        <div class="detail-category">

            ${noticia.categoria}

        </div>


        <h1 class="detail-title">

            ${noticia.titulo}

        </h1>


        <div class="detail-meta">

            <span>
                📅 ${noticia.fecha}
            </span>

            <span>
                ✍️ ${noticia.autor}
            </span>

        </div>


        <img
            class="detail-image"
            src="${noticia.imagen}"
            alt="${noticia.titulo}"
            onerror="this.src='https://via.placeholder.com/1200x600?text=NewsWorld'"
        >


        <article class="detail-content">

            <p class="detail-intro">

                ${noticia.descripcion}

            </p>


            <p>

                ${noticia.contenido}

            </p>

        </article>


        <div class="detail-actions">

            <button
                class="btn btn-primary"
                onclick="alternarFavorito(${noticia.id}); actualizarDetalle(${noticia.id})">

                ${favorito
                    ? "❤️ Quitar de favoritos"
                    : "♡ Agregar a favoritos"}

            </button>


            <a
                href="contacto.html"
                class="btn btn-secondary">

                Contactar

            </a>

        </div>

    `;

}


function actualizarDetalle(id) {

    const favoritos =
        estaEnFavoritos(id);


    const boton =
        document.querySelector(
            ".detail-actions button"
        );


    if (!boton) return;


    boton.innerHTML =
        favoritos
            ? "❤️ Quitar de favoritos"
            : "♡ Agregar a favoritos";

}


function mostrarError() {

    document.getElementById(
        "detalleNoticia"
    ).innerHTML = `

        <div class="error-page">

            <h1>
                😕
            </h1>

            <h2>
                Noticia no encontrada
            </h2>

            <a
                href="noticias.html"
                class="btn btn-primary">

                Volver a noticias

            </a>

        </div>

    `;

}