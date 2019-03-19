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
    this.eventService.getAllEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }

}
