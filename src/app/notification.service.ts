import { Injectable } from '@angular/core';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  

  constructor(private localNotifications: PhonegapLocalNotification) {

   }

  init() {
    this.localNotifications.requestPermission().then((permission) => {
      if(permission === 'granted') {
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
}
