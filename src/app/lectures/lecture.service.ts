import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Lecture } from './lecture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>('https://api.stuv-mosbach.de/api/lectures/' + courseId.toUpperCase());
  }

  getFutureLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>('https://api.stuv-mosbach.de/api/futureLectures/' + courseId.toUpperCase());
  }
}
