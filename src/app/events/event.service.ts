import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { URLProviderService } from '../urlprovider.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private urls: URLProviderService) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.urls.events_url);
  }
}
