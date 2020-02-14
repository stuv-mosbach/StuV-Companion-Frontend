import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ThemeService } from './theming/theme.service';
import { NetworkProviderService } from './network-provider.service';
import { debounceTime } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  theme: string;
  networkActive: Boolean = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private themeService: ThemeService,
    private networkProviderService: NetworkProviderService,
    private toastController: ToastController,
    private notificationService: NotificationService
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
      });
      this.splashScreen.hide();
      this.networkProviderService.getNetworkStatus().pipe(debounceTime(300)).subscribe((connected: boolean) => {
        this.handleNetwork(connected);
      });
      this.notificationService.init();
    });
  }

  handleNetwork(status: boolean) {
    console.log('Network status:' + status);
    if (!status) { this.presentToast('No network connection'); }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      buttons: [
        {
          text: "Dismiss",
          role: 'cancel',
          handler: () => {
            console.log('Network toast dismissed.');
          }
        }
      ]
    });
    toast.present();
  }
}
