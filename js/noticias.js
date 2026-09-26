let todasLasNoticias = [];

let categoriaActual = "Todas";


document.addEventListener(
    "DOMContentLoaded",
    cargarNoticias
);


async function cargarNoticias() {

    try {

        const noticiasGuardadas =
            localStorage.getItem("noticiasAdmin");


        if (noticiasGuardadas) {

            todasLasNoticias =
                JSON.parse(noticiasGuardadas);

        } else {

            const respuesta =
                await fetch("./data/noticias.json");

            todasLasNoticias =
                await respuesta.json();

        }


        mostrarNoticias(
            todasLasNoticias
        );

    } catch (error) {

        console.error(
            "Error cargando noticias:",
            error
        );


        document.getElementById(
            "listaNoticias"
        ).innerHTML = `

            <div class="no-results">

                <h2>
                    Error al cargar las noticias
                </h2>

                <p>
                    Verifica que el archivo
                    noticias.json exista.
                </p>

            </div>

        `;

    }

}


function mostrarNoticias(noticias) {

    const contenedor =
        document.getElementById(
            "listaNoticias"
        );


    const sinResultados =
        document.getElementById(
            "sinResultados"
        );


    if (!noticias.length) {

        contenedor.innerHTML = "";

        sinResultados.style.display =
            "block";

        return;

    }


    sinResultados.style.display =
        "none";


    contenedor.innerHTML =
        noticias.map(noticia => {

            const favorito =
                estaEnFavoritos(
                    noticia.id
                );


            return `

                <article class="news-card">

                    <div class="news-image">

                        <img
                            src="${noticia.imagen}"
                            alt="${noticia.titulo}"
                            onerror="
                                this.src='https://placehold.co/600x400?text=NewsWorld'
                            "
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
                                href="./detalle.html?id=${noticia.id}"
                                class="btn-small">

                                Ver más

                            </a>


                            <button
                                class="favorite-btn ${
                                    favorito
                                        ? "favorite-active"
                                        : ""
                                }"
                                onclick="
                                    alternarFavorito(${noticia.id});
                                    actualizarNoticias();
                                "
                            >

                                ${
                                    favorito
                                        ? "❤️"
                                        : "♡"
                                }

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


function filtrarNoticias() {

    const campo =
        document.getElementById(
            "buscarNoticia"
        );


    const texto =
        campo
            ? campo.value
                .toLowerCase()
                .trim()
            : "";


    const resultado =
        todasLasNoticias.filter(
            noticia => {

                const coincideTexto =

                    noticia.titulo
                        .toLowerCase()
                        .includes(texto)

                    ||

                    noticia.descripcion
                        .toLowerCase()
                        .includes(texto);


                const coincideCategoria =

                    categoriaActual === "Todas"

                    ||

                    noticia.categoria ===
                        categoriaActual;


                return (
                    coincideTexto &&
                    coincideCategoria
                );

            }
        );


    mostrarNoticias(resultado);

}


function actualizarNoticias() {

    filtrarNoticias();

}


document.addEventListener(
    "input",
    event => {

        if (
            event.target.id ===
            "buscarNoticia"
        ) {

            filtrarNoticias();

        }

    }
);


document.addEventListener(
    "click",
    event => {

        const boton =
            event.target.closest(
                ".filter"
            );


        if (!boton) return;


        document
            .querySelectorAll(
                ".filter"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        boton.classList.add(
            "active"
        );


        categoriaActual =
            boton.dataset.category;


        filtrarNoticias();

    }
);