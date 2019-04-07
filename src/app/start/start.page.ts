import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StartService } from './start-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  courses: any[];
  selectedCourse: string;
  themes: string[] =  ['dark-red', 'dark-mint', 'dark-blue', 'light-blue', 'light-mint', 'light-red'];
  selectedTheme: string;

  constructor(private startService: StartService, private toastController: ToastController, private storage: Storage, private router: Router, private themeService: ThemeService) {
    this.startService.getAllCourses().subscribe((list: string[]) => {
      this.courses = list;
      this.courses.sort();
    });
  }

  ngOnInit() {

  }

  submit() {
    this.presentToast();
    this.storage.set('active', 'yes');
    this.storage.set('course', this.selectedCourse).then(() => {
      this.themeService.setTheme(this.selectedTheme);
      this.router.navigate(['tabs/home']);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.selectedCourse + ' saved as selected course.',
      showCloseButton: true,
      closeButtonText: 'Dismiss',
      duration: 2000
    });
    toast.present();
  }
}
