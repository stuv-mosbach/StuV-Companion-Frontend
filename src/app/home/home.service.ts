import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMensaplan() {
    return this.http.get("http://dev.stuv-mosbach.de:8080/api/mensaplan");
  }

  getToday(courseId: string) {
    return this.http.get('http://dev.stuv-mosbach.de:8080/api/getToday/' + courseId.toUpperCase());
  }
}
