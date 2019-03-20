import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';
import { Storage } from '@ionic/storage';
import { Lecture } from './lecture.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit {
  lectures: Lecture[];
  lectureMap: Map<string, Lecture[]> = new Map();

  constructor(private lectureService: LectureService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('course').then((data) => {
      this.lectureService.getFutureLectures(data).subscribe((lectures: Lecture[]) => {
        this.lectures = lectures;
        this.lectures.sort((a, b) => {
          return new Date(a.start).getTime() - new Date(b.start).getTime();
        });
        this.initLectureMap();
      });
    });
  }

  ionViewDidEnter() {
    //todo: need to move the loading here but html needs to be cleared fist to get course changes detected
  }

  initLectureMap() {
    this.lectures.forEach((lecture) => {
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

  dateComparator(a: KeyValue <string, Lecture[]>, b: KeyValue<string, Lecture[]>) {
    return new Date(a.key).getTime() - new Date(b.key).getTime();
  }
}
