import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Lecture } from './lecture.model';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(environment.backendURL + 'lectures/' + courseId.toUpperCase());
  }

  getFutureLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(environment.backendURL + 'futureLectures/' + courseId.toUpperCase());
  }
}
