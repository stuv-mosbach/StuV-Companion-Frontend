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
  lectureMap: Map<string, Lecture[]> = new Map();

  //cache: Cache<any[]>;
  //oldCourse: String;
  data: any[];

  events = [];
  news = [];
  meals = null;
  mealplan = {
    days: [],
    validUntil: ''
  };
  weekend = false;

  constructor(private storage: Storage, private homeService: HomeService, private cacheService: CacheService) {
    // storage.get('course').then(courseID => {
    //   this.oldCourse = courseID;
    //   const data = homeService.getToday(courseID);
    //   cacheService.register('today', data).subscribe(cache => {
    //     this.cache = cache;

    //     this.result = this.cache.get$;
    //     this.initThis();
    //   });
    // });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.weekend = false;
    if ((new Date()).getDay() == 0 || (new Date()).getDay() == 6) this.weekend = true;
    this.storage.get('course').then(courseID => {
      let homeObservable = this.homeService.getToday(courseID);
      this.cacheService
        .register('homeCache', homeObservable)
        .mergeMap((cache: Cache<any[]>) => cache.get())
        .subscribe(data => {
          this.data = data;
          this.events = this.data[3];
          this.news = this.data[2];
          this.meals = this.data[0][0];
          this.initLectureMap();
          this.initMeals();
          });
    });
    this.updateHome();
  }

  updateHome() {
    this.cacheService
      .get('homeCache')
      .mergeMap((cache: Cache<any[]>) => cache.refresh())
      .subscribe(data => {
        this.data = data;
        this.events = this.data[3];
        this.news = this.data[2];
        this.meals = this.data[0][0];
        this.initLectureMap();
        this.initMeals();
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
