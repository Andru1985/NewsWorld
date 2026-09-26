document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorFavoritos();

});


function obtenerFavoritos() {

    return JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];

}


function guardarFavoritos(favoritos) {

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}


function actualizarContadorFavoritos() {

    const favoritos = obtenerFavoritos();

    const contadores =
        document.querySelectorAll(
            "#contadorFavoritos"
        );

    contadores.forEach(contador => {

        contador.textContent =
            favoritos.length;

    });

}


function estaEnFavoritos(id) {

    const favoritos =
        obtenerFavoritos();

    return favoritos.includes(Number(id));

}


function alternarFavorito(id) {

    id = Number(id);

    let favoritos =
        obtenerFavoritos();


    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito => favorito !== id
            );

    } else {

        favoritos.push(id);

    }

    async function cargarNoticiasDestacadas() {

    const contenedor =
        document.getElementById(
            "noticiasDestacadas"
        );


    if (!contenedor) return;


    try {

        const respuesta =
            await fetch("data/noticias.json");

        const noticias =
            await respuesta.json();


        const destacadas =
            noticias.slice(0, 3);


        contenedor.innerHTML =
            destacadas.map(noticia => `

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
                                class="favorite-btn"
                                onclick="
                                alternarFavorito(${noticia.id});
                                cargarNoticiasDestacadas();
                                ">

                                ${
                                    estaEnFavoritos(noticia.id)
                                    ? "❤️"
                                    : "♡"
                                }

                            </button>

                        </div>

                    </div>

                </article>

            `).join("");


    } catch (error) {

        console.error(
            "Error cargando destacadas:",
            error
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    cargarNoticiasDestacadas
);


    guardarFavoritos(favoritos);

    actualizarContadorFavoritos();

}