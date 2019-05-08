import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {ThemeService} from './theming/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  theme: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault(); // May cause errors on android will observe if this change fixes it
      this.themeService.getTheme().subscribe({
        next: (dataTheme) => this.theme = dataTheme
      });
      this.storage.get('active').then((data) => {
        if (data == null || data === 'no') {
          this.router.navigate(['start']);
        } else {
          this.router.navigate(['app/tabs/home']);
        }
      });
      this.platform.backButton.subscribeWithPriority(9999, () => {
        console.log('Blocked backbutton');
      })
      this.splashScreen.hide();
    });
  }
}
