import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemPage } from './news-item.page';

describe('NewsItemPage', () => {
  let component: NewsItemPage;
  let fixture: ComponentFixture<NewsItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
