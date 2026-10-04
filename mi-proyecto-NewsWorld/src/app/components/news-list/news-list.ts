import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card';
import { Noticia } from '../../models/noticia';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './news-list.html',
  styleUrl: './news-list.css'
})
export class NewsListComponent {

  @Input() noticias: Noticia[] = [];

}