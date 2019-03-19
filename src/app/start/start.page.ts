import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StartService } from './start-service.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  courses: any[];

  constructor(private startService: StartService, private toastController: ToastController) {
    this.startService.getAllCourses().subscribe((list: string[]) => {
      this.courses = list;
    });
  }

  ngOnInit() {

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }
}
