import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  selectedTheme = new BehaviorSubject('');

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
}
