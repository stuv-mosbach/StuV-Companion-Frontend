import { Component, OnInit } from '@angular/core';
import {News} from './news.model';
import {NewsService} from './news.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: News[];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((news: News[]) =>{
      this.news = news;
      this.news.sort((a, b) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
    });
  }

}
