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

  events = null;
  news = null;
  meals = null;
  mealplan = {
    days: [],
    validUntil: ""
  };

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
        this.events = this.data[3];
        this.news = this.data[2];
        this.meals = this.data[0][0];
        this.initLectureMap();
        this.initMeals();
        console.log(this.news);
      });
    });
  }

  initMeals() {
    this.mealplan = {
      days: [],
      validUntil: ""
    };

    this.mealplan.validUntil = this.meals.validUntil;
    this.mealplan.days.push({
      name: "Montag",
      active: false,
      meals: this.meals.montag
    });
    this.mealplan.days.push({
      name: "Dienstag",
      active: false,
      meals: this.meals.dienstag
    });
    this.mealplan.days.push({
      name: "Mittwoch",
      active: false,
      meals: this.meals.mittwoch
    });
    this.mealplan.days.push({
      name: "Donnerstag",
      active: false,
      meals: this.meals.donnerstag
    });
    this.mealplan.days.push({
      name: "Freitag",
      active: false,
      meals: this.meals.freitag
    });

    this.mealplan.days[(new Date()).getDay() - 1].active = true;
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
