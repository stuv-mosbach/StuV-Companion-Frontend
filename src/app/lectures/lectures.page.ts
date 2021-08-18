import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';
import { Storage } from '@ionic/storage';
import { Lecture } from './lecture.model';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';
import { CacheService, Cache } from 'ionic-cache-observable';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit {
  lectures: Lecture[];
  lectureMap: Map<string, Lecture[]> = new Map();
  searchTerm = '';

  constructor(private lectureService: LectureService, private storage: Storage, private cacheService: CacheService, private notifications: NotificationService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.storage.get('course').then(courseID => {
      let lectureObservable = this.lectureService.getFutureLectures(courseID);
      this.cacheService
        .register('lectureCache', lectureObservable)
        .mergeMap((cache: Cache<Lecture[]>) => cache.get())
        .subscribe(data => {
          this.lectures = data;
          this.initLectureMap(this.searchTerm);
        });
    });
    this.updateLectures();
  }

  updateLectures() {
    this.cacheService
      .get('lectureCache')
      .mergeMap((cache: Cache<Lecture[]>) => cache.refresh())
      .subscribe(data => {
        this.lectures = data;
        this.initLectureMap(this.searchTerm);
      });
  }

  searching() {
    this.initLectureMap(this.searchTerm);
  }

  // Changing Bar at top - unused

  segmentChanged(ev: any) {
    if (ev.detail.value === 'future') {
      //this.ionViewDidEnter();
    } else if (ev.detail.value === 'all') {
      //this.getAllLectures();
    }
  }


  // Lecture Handling

  initLectureMap(term) {
    this.lectureMap = new Map();
    let filteredLectures = this.lectures.filter(item => {
      return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
    filteredLectures.sort((a, b) => {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
    filteredLectures.forEach((lecture) => {
      const date: Date = this.getDateWithoutTime(lecture.start);
      if (this.lectureMap.get(date.toString()) !== undefined) {
        this.lectureMap.get(date.toString()).push(lecture);
      } else {
        this.lectureMap.set(date.toString(), Array.of(lecture));
      }
    });
    return this.lectureMap;
  }

  private getDateWithoutTime(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  dateComparator(a: KeyValue<string, Lecture[]>, b: KeyValue<string, Lecture[]>) {
    return new Date(a.key).getTime() - new Date(b.key).getTime();
  }
}
