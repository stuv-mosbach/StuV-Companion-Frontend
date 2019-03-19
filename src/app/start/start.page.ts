import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StartService } from './start-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  courses: any[];
  selectedCourse: string;

  constructor(private startService: StartService, private toastController: ToastController, private storage: Storage, private router: Router) {
    this.startService.getAllCourses().subscribe((list: string[]) => {
      this.courses = list;
    });
  }

  ngOnInit() {

  }

  submit() {
    this.presentToast();
    this.storage.set('active', 'yes');
    this.storage.set('course', this.selectedCourse)
          .then(() => {
            this.router.navigate(['tabs/home']);
          });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.selectedCourse + " saved as selected course.",
      duration: 2000
    });
    toast.present();
  }
}
