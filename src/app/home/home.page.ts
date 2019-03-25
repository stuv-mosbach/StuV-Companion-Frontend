import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from './home.service';
import { Mensa } from './mensa.model';
import { Lecture } from '../lectures/lecture.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  data: any[];
  selection: boolean[];
  lectureMap: Map<string, Lecture[]> = new Map();

  constructor(private storage: Storage, private homeService: HomeService) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.selection = [true, true, true, true, true, true, true];
    this.selection[(new Date()).getDay()] = false;
    // this.homeService.getMensaplan().subscribe((mensa: Mensa) => {
    //   this.mensa = mensa;
    //   this.isReady = true;
    //   console.log(this.mensa);
    // });
    this.storage.get('course').then((data) => {
      this.homeService.getToday(data).subscribe((result: any[]) => {
        this.data = null;
        this.data = result;
        this.initLectureMap();
        console.log(result);
      });
    });
  }

  initLectureMap() {
    this.lectureMap = new Map();
    this.data[1].forEach((lecture) => {
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
