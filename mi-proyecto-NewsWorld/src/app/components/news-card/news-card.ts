import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-card.html',
  styleUrl: './news-card.css'
})
export class NewsCardComponent {

  @Input() noticia!: Noticia;
  @Output() favoritoCambiado = new EventEmitter<Noticia>();

  constructor(private newsService: NewsService) {}

 toggleFav(): void {
  this.newsService.cambiarFavorito(this.noticia);
  this.favoritoCambiado.emit();
}
}