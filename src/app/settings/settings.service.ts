import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLProviderService } from '../urlprovider.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private urls: URLProviderService) { }

  getAllCourses() {
    return this.http.get(this.urls.course_url);
  }
}
