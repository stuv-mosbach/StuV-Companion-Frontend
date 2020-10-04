import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { News } from './news.model';
import { Observable } from 'rxjs';
import { URLProviderService } from '../urlprovider.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private urls: URLProviderService) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.urls.news_url);
  }
}
