import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from './event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }

    ionViewDidEnter() {
      this.eventService.getAllEvents().subscribe((events: Event[]) => {
        this.events = events;
        this.events.sort((a, b) => {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });
      });
    }
}
