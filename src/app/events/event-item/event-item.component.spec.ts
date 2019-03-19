import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventItemPage } from './event-item.page';

describe('EventItemPage', () => {
  let component: EventItemPage;
  let fixture: ComponentFixture<EventItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
