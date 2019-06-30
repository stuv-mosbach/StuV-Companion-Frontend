import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from './event.model';
import { CacheService, Cache } from 'ionic-cache-observable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: Observable<Event[]>;
  cache: Cache<Event[]>;

  constructor(private eventService: EventService, private cacheService: CacheService) {
    const data = eventService.getAllEvents();
    cacheService.register('events', data).subscribe((cache) => {
      this.cache = cache;
      this.events = this.cache.get$;
      this.events.subscribe(event => {
        event.sort((a, b) => {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });
      });
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.cache) {
      this.cache.refresh().subscribe(() => {
        console.log('Events Cache updated!');
      }, (err) => {
        console.log('Cache Error: ', err);
      });
    }
  }
}
