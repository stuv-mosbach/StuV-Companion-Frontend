import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get('https://api.stuv-mosbach.de/api/courses');
  }
}
