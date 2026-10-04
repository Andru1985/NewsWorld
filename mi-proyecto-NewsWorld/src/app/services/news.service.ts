import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Innovación en NewsWorld',
      resumen: 'Migración exitosa del ecosistema web a la arquitectura moderna de Angular.',
      urlImagen: 'https://picsum.photos/400/250?random=1',
      esFavorito: false
    },
    {
      id: 2,
      titulo: 'Avances Tecnológicos',
      resumen: 'Las nuevas herramientas de desarrollo web optimizan el rendimiento frontend.',
      urlImagen: 'https://picsum.photos/400/250?random=2',
      esFavorito: false
    },
    {
      id: 3,
      titulo: 'Despliegues en la Nube',
      resumen: 'Las plataformas de integración continua permiten publicar aplicaciones en minutos.',
      urlImagen: 'https://picsum.photos/400/250?random=3',
      esFavorito: false
    }
  ];

  obtenerNoticias(): Noticia[] {
    this.noticias.forEach(noticia => {
      const guardado = this.leerFavorito(noticia.id);

      noticia.esFavorito = guardado === 'true';
    });

    return this.noticias;
  }

  cambiarFavorito(noticia: Noticia): void {
    noticia.esFavorito = !noticia.esFavorito;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(
        'newsworld_fav_' + noticia.id,
        String(noticia.esFavorito)
      );
    }
  }

  obtenerFavoritos(): Noticia[] {
    this.obtenerNoticias();

    return this.noticias.filter(noticia => noticia.esFavorito);
  }

  private leerFavorito(id: number): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem('newsworld_fav_' + id);
  }
}