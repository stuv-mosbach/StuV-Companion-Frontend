import { Injectable } from '@angular/core';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private gotPermission: boolean = false;

  constructor(private localNotifications: PhonegapLocalNotification) {

   }

  init() {
    this.localNotifications.requestPermission().then((permission) => {
      if(permission === 'granted') {
        this.gotPermission = true;
        this.fireSimpleNotification('Benachrichtigungen', 'Du hast die Benachrichtigungen für die StuV Companion App aktiviert.', 'startup');
      }
    });
  }

  fireSimpleNotification(title: string, message: string, tag: string) {
    this.localNotifications.create(title, {
      tag: tag,
      body: message,
      icon: 'assets/icon/favicon.png'
    });
  }

  getPermissionState() {
    return this.gotPermission;
  }
}
