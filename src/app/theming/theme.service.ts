import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Storage } from '@ionic/storage';
import {Theme} from './theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = new BehaviorSubject('');

  // TODO add better names to themes in select, add bubbles in select with accent colors
  allThemes: Theme[] = [
    {name: 'Dark DHBW Red', classId: 'dark-dhbw-red'},
    {name: 'Dark Red', classId: 'dark-red'},
    {name: 'Dark Mint', classId: 'dark-mint'},
    {name: 'Dark Blue', classId: 'dark-blue'},
    {name: 'Light DHBW Red', classId: 'light-dhbw-red'},
    {name: 'Light Blue', classId: 'light-blue'},
    {name: 'Light Mint', classId: 'light-mint'},
    {name: 'Light Red', classId: 'light-red'}
  ];

  constructor(private storage: Storage) {
    this.storage.get('theme').then((data) => {
      if (data === null || data === undefined) {
        data = 'light-dhbw-red';
      }
      this.selectedTheme.next(data);
    });
  }

  getTheme(): Observable<string> {
    return this.selectedTheme;
  }

  setTheme(theme: string) {
    this.storage.set('theme', theme);
    this.selectedTheme.next(theme);
  }

  getAllThemes(): Theme[] {
    return this.allThemes;
  }
}
