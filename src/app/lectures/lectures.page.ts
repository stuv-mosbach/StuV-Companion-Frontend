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
  //cache: Cache<Lecture[]>;
  lectureMap: Map<string, Lecture[]> = new Map();
  //oldCourse: String;
  searchTerm = '';

  constructor(private lectureService: LectureService, private storage: Storage, private cacheService: CacheService, private notifications: NotificationService) {
    // storage.get('course').then((courseID) => {
    //   this.oldCourse = courseID;
    //   const data = lectureService.getFutureLectures(courseID);

    //   cacheService.register('lectures', data).subscribe((cache) => {
    //     this.cache = cache;

    //     this.lectures = null;
    //     this.lectures = this.cache.get$;
    //     this.initLectureMap();
    //   });
    // });
  }

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
        })
    })
    // this.storage.get('course').then((courseID) => {
    //   if (this.oldCourse !== courseID) {
    //     this.oldCourse = courseID;
    //     const data = this.lectureService.getFutureLectures(courseID);

    //     this.cacheService.register('lectures', data).subscribe((cache) => {
    //       this.cache = cache;

    //       this.lectures = null;
    //       this.lectures = this.cache.get$;
    //       this.lectureMap = null;
    //       this.initLectureMap(); // Known bug: doesnt refresh only on tab change!
    //     });
    //   } else {
    //     if (this.cache) {
    //       this.cache.refresh().subscribe(() => {
    //         console.log('Lecture Cache updated!');
    //         this.initLectureMap();
    //       }, (err) => {
    //         console.log('Lecture Error: ', err);
    //       });
    //     }
    //   }
    // });
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
