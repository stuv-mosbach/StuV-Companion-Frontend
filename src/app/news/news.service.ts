import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { News } from './news.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.http.get<News[]>('https://api.stuv-mosbach.de/api/news');
  }
}
