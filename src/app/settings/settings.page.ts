import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  course: string;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
        this.storage.get('course').then((data) => {
            this.course = data;
        });
  }

  reset() {
    this.storage.set('active', 'no')
    .then(() => {
      this.storage.remove("course")
      .then(() => {
        this.router.navigate(['start']);
      });
    });
  }
}
