import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';
import { Storage } from '@ionic/storage';
import { Lecture } from './lecture.model';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';
import { CacheService, Cache } from 'ionic-cache-observable';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit {
  lectures: Observable<Lecture[]>;
  cache: Cache<Lecture[]>
  lectureMap: Map<string, Lecture[]> = new Map();
  oldCourse: String;

  constructor(private lectureService: LectureService, private storage: Storage, private cacheService: CacheService) {
    storage.get('course').then((courseID) => {
      this.oldCourse = courseID;
      const data = lectureService.getFutureLectures(courseID);

      cacheService.register('lectures', data).subscribe((cache) => {
        this.cache = cache;

        this.lectures = null;
        this.lectures = this.cache.get$;
        this.initLectureMap();
      })
    })
   }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('course').then((courseID) => {
      if(this.oldCourse != courseID){
        this.oldCourse = courseID;
        const data = this.lectureService.getFutureLectures(courseID);
  
        this.cacheService.register('lectures', data).subscribe((cache) => {
          this.cache = cache;
  
          this.lectures = null;
          this.lectures = this.cache.get$;
          this.lectureMap = null;
          this.initLectureMap(); //Known bug: doesnt refresh only on tab change!
        })
      } else {
        if (this.cache) {
          this.cache.refresh().subscribe(() => {
            console.log("Lecture Cache updated!");
            this.initLectureMap();
          }, (err) => {
            console.log("Lecture Error: ", err);
          })
        }
      }
    })
  }

  getAllLectures() {
    this.storage.get('course').then((courseID) => {
      if(this.oldCourse != courseID){
        this.oldCourse = courseID;
      }
      this.lectures = null;
      this.lectureService.getLectures(courseID).subscribe(data => {
        this.lectures = Observable.of(data);
        this.initLectureMap();
      })
    });
  }

  segmentChanged(ev: any) {
    if(ev.detail.value == 'future') {
      this.ionViewDidEnter();
    } else if (ev.detail.value == 'all') {
      this.getAllLectures();
    }
  }

  initLectureMap() {
    this.lectureMap = new Map();
    this.lectures.subscribe(data => {
      data.sort((a, b) => {
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
      data.forEach((lecture) => {
          const date: Date = this.getDateWithoutTime(lecture.start);
          if (this.lectureMap.get(date.toString()) !== undefined) {
            this.lectureMap.get(date.toString()).push(lecture);
          } else {
            this.lectureMap.set(date.toString(), Array.of(lecture));
          }
        });
    })
    return this.lectureMap;
  }

  private getDateWithoutTime(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  dateComparator(a: KeyValue <string, Lecture[]>, b: KeyValue<string, Lecture[]>) {
    return new Date(a.key).getTime() - new Date(b.key).getTime();
  }
}
