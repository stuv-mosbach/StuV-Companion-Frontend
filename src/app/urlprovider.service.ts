import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLProviderService {

  constructor() { }

  private url = "https://stuv-api.roth-kl.de";
  course_url = `${this.url}/api/courses`;
  news_url = `${this.url}/api/news`;
  lectures_url = `${this.url}/api/lectures/`;
  futurelectures_url = `${this.url}/api/futureLectures/`;
  mensa_url = `${this.url}/api/mensaplan`;
  today_url = `${this.url}/api/getToday/`;
  events_url = `${this.url}/api/events`;
}
