import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = new BehaviorSubject('');

  // TODO add better names to themes in select, add bubbles in select with accent colors
  allThemes = ['dark-red', 'dark-mint', 'dark-blue', 'light-blue', 'light-mint', 'light-red'];

  constructor(private storage: Storage) {
    this.storage.get('theme').then((data) => {
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
