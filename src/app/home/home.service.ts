import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMensaplan() {
    return this.http.get('https://api.stuv-mosbach.de/api/mensaplan');
  }

  getToday(courseId: string): Observable<any[]> {
    return this.http.get<any[]>('https://api.stuv-mosbach.de/api/getToday/' + courseId.toUpperCase());
  }
}
