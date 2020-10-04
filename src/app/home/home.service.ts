import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLProviderService } from '../urlprovider.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private urls: URLProviderService) { }

  getMensaplan() {
    return this.http.get(this.urls.mensa_url);
  }

  getToday(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(this.urls.today_url + courseId.toUpperCase());
  }
}
