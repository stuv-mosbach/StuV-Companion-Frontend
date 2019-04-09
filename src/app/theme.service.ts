import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = new BehaviorSubject('');

  // TODO add better names to themes in select, add bubbles in select with accent colors
  allThemes = ['dark-dhbw-red', 'dark-red', 'dark-mint', 'dark-blue', 'light-dhbw-red', 'light-blue', 'light-mint', 'light-red'];

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

  getAllThemes(): string[] {
    return this.allThemes;
  }
}
