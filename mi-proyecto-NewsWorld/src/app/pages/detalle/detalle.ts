import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NewsService } from '../../services/news.service';
import { Noticia } from '../../models/noticia';
import { NewsCardComponent } from '../../components/news-card/news-card';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NewsCardComponent
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class DetalleComponent implements OnInit {

  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.noticia = this.newsService
      .obtenerNoticias()
      .find(item => item.id === id);
  }
}