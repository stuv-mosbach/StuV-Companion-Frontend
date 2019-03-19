import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureItemPage } from './lecture-item.page';

describe('LectureItemPage', () => {
  let component: LectureItemPage;
  let fixture: ComponentFixture<LectureItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
