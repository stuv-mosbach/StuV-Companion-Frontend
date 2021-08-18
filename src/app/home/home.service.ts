import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMensaplan() {
    return this.http.get(environment.backendURL + 'mensaplan/');
  }

  getToday(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(environment.backendURL + 'getToday/' + courseId.toUpperCase());
  }
}
