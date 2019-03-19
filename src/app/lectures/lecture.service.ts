import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) { }

  getLectures(courseId: string) {
    return this.http.get('http://dev.stuv-mosbach.de:8080/api/lectures/' + courseId.toUpperCase());
  }
}
