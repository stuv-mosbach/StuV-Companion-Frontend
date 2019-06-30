import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from './home.service';
import { Lecture } from '../lectures/lecture.model';
import { KeyValue } from '@angular/common';
import { CacheService, Cache } from 'ionic-cache-observable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  result: Observable<any[]>;
  lectureMap: Map<string, Lecture[]> = new Map();

  cache: Cache<any[]>;
  oldCourse: String;
  data: any[];

  events = [];
  news = [];
  meals = null;
  mealplan = {
    days: [],
    validUntil: ''
  };

  constructor(private storage: Storage, private homeService: HomeService, private cacheService: CacheService) {
    storage.get('course').then(courseID => {
      this.oldCourse = courseID;
      const data = homeService.getToday(courseID);
      cacheService.register('today', data).subscribe(cache => {
        this.cache = cache;

        this.result = this.cache.get$;
        this.initThis();
      });
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('course').then((courseID) => {
      if (this.oldCourse !== courseID) {
        this.oldCourse = courseID;
        const data = this.homeService.getToday(courseID);
        this.cacheService.register('today', data).subscribe(cache => {
          this.cache = cache;

          this.result = this.cache.get$;
          this.initThis();
        });
      } else {
        if (this.cache) {
          this.cache.refresh().subscribe(() => {
            console.log('Home Cache updated!');
            this.initThis();
          }, (err) => {
            console.log('Home Error: ', err);
          });
        }
      }
    });
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'today') {
      this.mealplan.days.forEach(element => {
        element.active = false;
      });
      this.mealplan.days[(new Date()).getDay() - 1].active = true;
    } else if (ev.detail.value === 'complete') {
      this.mealplan.days.forEach(element => {
        element.active = true;
      });
    }
  }

  initThis() {
    this.result.subscribe(data => {
      this.data = data;
      this.events = this.data[3];
      this.news = this.data[2];
      this.meals = this.data[0][0];
      this.initLectureMap();
      this.initMeals();
    });
  }

  initMeals() {
    this.mealplan = {
      days: [],
      validUntil: ''
    };

    this.mealplan.validUntil = this.meals.validUntil;
    this.mealplan.days.push({
      name: 'Montag',
      active: false,
      meals: this.meals.montag
    });
    this.mealplan.days.push({
      name: 'Dienstag',
      active: false,
      meals: this.meals.dienstag
    });
    this.mealplan.days.push({
      name: 'Mittwoch',
      active: false,
      meals: this.meals.mittwoch
    });
    this.mealplan.days.push({
      name: 'Donnerstag',
      active: false,
      meals: this.meals.donnerstag
    });
    this.mealplan.days.push({
      name: 'Freitag',
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

  dateComparator(a: KeyValue<string, Lecture[]>, b: KeyValue<string, Lecture[]>) {
    return new Date(a.key).getTime() - new Date(b.key).getTime();
  }

}
