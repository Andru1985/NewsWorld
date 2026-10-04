import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { Noticia } from '../../models/noticia';
import { NewsCardComponent } from '../../components/news-card/news-card';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class FavoritosComponent implements OnInit {

  listaFavoritos: Noticia[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.actualizarFavoritos();
  }

  actualizarFavoritos(): void {
    this.listaFavoritos = this.newsService.obtenerFavoritos();
  }
}