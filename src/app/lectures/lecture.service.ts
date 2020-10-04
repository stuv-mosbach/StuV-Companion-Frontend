import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Lecture } from './lecture.model';
import { Observable } from 'rxjs';
import { URLProviderService } from '../urlprovider.service';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient, private urls: URLProviderService) { }

  getLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.urls.lectures_url + courseId.toUpperCase());
  }

  getFutureLectures(courseId: string): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.urls.futurelectures_url + courseId.toUpperCase());
  }
}
