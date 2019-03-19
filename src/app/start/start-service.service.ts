import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http: HttpClient) {}

  getAllCourses() {
    return this.http.get('http://dev.stuv-mosbach.de:8080/api/courses');
  }
}
