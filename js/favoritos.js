let noticiasDisponibles = [];


document.addEventListener(
    "DOMContentLoaded",
    cargarFavoritos
);


async function cargarFavoritos() {

    try {

        const respuesta =
            await fetch("data/noticias.json");

        noticiasDisponibles =
            await respuesta.json();


        mostrarFavoritos();

    } catch (error) {

        console.error(error);

    }

}


function mostrarFavoritos() {

    const ids =
        obtenerFavoritos();


    const favoritos =
        noticiasDisponibles.filter(
            noticia =>
                ids.includes(noticia.id)
        );


    const contenedor =
        document.getElementById(
            "listaFavoritos"
        );


    const mensaje =
        document.getElementById(
            "sinFavoritos"
        );


    if (favoritos.length === 0) {

        contenedor.innerHTML = "";

        mensaje.style.display =
            "block";

        return;

    }


    mensaje.style.display =
        "none";


    contenedor.innerHTML =
        favoritos.map(noticia => `

            <article class="news-card">

                <div class="news-image">

                    <img
                        src="${noticia.imagen}"
                        alt="${noticia.titulo}"
                        onerror="this.src='https://via.placeholder.com/600x400?text=NewsWorld'"
                    >

                    <span class="news-category">
                        ${noticia.categoria}
                    </span>

                </div>


                <div class="news-content">

                    <small>
                        ${noticia.fecha}
                    </small>

                    <h3>
                        ${noticia.titulo}
                    </h3>

                    <p>
                        ${noticia.descripcion}
                    </p>


                    <div class="card-actions">

                        <a
                            href="detalle.html?id=${noticia.id}"
                            class="btn-small">

                            Ver más

                        </a>


                        <button
                            class="favorite-btn favorite-active"
                            onclick="eliminarFavorito(${noticia.id})">

                            ❤️

                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}


function eliminarFavorito(id) {

    let favoritos =
        obtenerFavoritos();


    favoritos =
        favoritos.filter(
            favorito =>
                favorito !== Number(id)
        );


    guardarFavoritos(favoritos);

    actualizarContadorFavoritos();

    mostrarFavoritos();

}