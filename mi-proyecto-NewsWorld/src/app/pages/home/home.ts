import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from '../../components/news-list/news-list';
import { NewsService } from '../../services/news.service';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NewsListComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  listaNoticias: Noticia[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.listaNoticias = this.newsService.obtenerNoticias();
  }

}