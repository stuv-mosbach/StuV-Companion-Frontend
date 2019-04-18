import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMensaplan() {
    return this.http.get('https://api.stuv-mosbach.de/api/mensaplan');
  }

  getToday(courseId: string) {
    return this.http.get('https://api.stuv-mosbach.de/api/getToday/' + courseId.toUpperCase());
  }
}
