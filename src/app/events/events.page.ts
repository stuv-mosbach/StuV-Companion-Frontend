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
  events: Event[];
  //cache: Cache<Event[]>;

  constructor(private eventService: EventService, private cacheService: CacheService) {
    // const data = eventService.getAllEvents();
    // cacheService.register('events', data).subscribe((cache) => {
    //   this.cache = cache;
    //   this.events = this.cache.get$;
    //   this.events.subscribe(event => {
    //     event.sort((a, b) => {
    //       return new Date(a.start).getTime() - new Date(b.start).getTime();
    //     });
    //   });
    // });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    let eventsObservable: Observable<Event[]> = this.eventService.getAllEvents();

    this.cacheService
      .register('eventCache', eventsObservable)
      .mergeMap((cache: Cache<Event[]>) => cache.get())
      .subscribe((data) => {
        this.events = data;
      })
    // if (this.cache) {
    //   this.cache.refresh().subscribe((data) => {
    //     console.log('Events Cache updated!');
    //     console.log(data);
    //   }, (err) => {
    //     console.log('Cache Error: ', err);
    //   });
    // }
    this.updateEvents();
  }

  updateEvents() {
    this.cacheService
      .get('eventCache')
      .mergeMap((cache: Cache<Event[]>) => cache.refresh())
      .subscribe((data) => {
        this.events = data;
      });
    console.log('Eventscache updated!')
  }
}
