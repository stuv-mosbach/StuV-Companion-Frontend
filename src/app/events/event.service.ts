import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get('http://dev.stuv-mosbach.de:8080/api/events');
  }
}
