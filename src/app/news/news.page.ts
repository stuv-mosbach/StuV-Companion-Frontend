import { Component, OnInit } from '@angular/core';
import { News } from './news.model';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { CacheService, Cache } from 'ionic-cache-observable';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: Observable<News[]>;
  cache: Cache<News[]>;

  constructor(private newsService: NewsService, private cacheService: CacheService) {
    const data = newsService.getNews();
    cacheService.register('news', data).subscribe((cache) => {
      this.cache = cache;

      this.news = this.cache.get$;
      this.news = this.news.map(e => {
        e.sort((a, b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
        return e;
      });
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.cache) {
      this.cache.refresh().subscribe(() => {
        console.log('News Cache updated!');
        this.news = this.news.map(data => {
          data.sort((a, b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
          });
          return data;
        });
      }, (err) => {
        console.log('News Error: ', err);
      });
    }
  }
}
