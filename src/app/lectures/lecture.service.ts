import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(courseId: string) {
    return this.http.get('https://api.stuv-mosbach.de/api/lectures/' + courseId.toUpperCase());
  }

  getFutureLectures(courseId: string) {
    return this.http.get('https://api.stuv-mosbach.de/api/futureLectures/' + courseId.toUpperCase());
  }
}
