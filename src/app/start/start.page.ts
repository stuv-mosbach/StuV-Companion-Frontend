import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StartService } from './start-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {ThemeService} from '../theming/theme.service';
import {Theme} from '../theming/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  courses: any[];
  themes: Theme[];
  startForm: FormGroup;


  constructor(private startService: StartService,
              private toastController: ToastController,
              private storage: Storage,
              private router: Router,
              private themeService: ThemeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
      this.startService.getAllCourses().subscribe((list: string[]) => {
          this.courses = list;
          this.courses.sort();
      });
    this.themes = this.themeService.getAllThemes();
    this.startForm = this.fb.group({
        course: ['', [
            Validators.required
        ]],
        theme: ['', [
            Validators.required
        ]]
    });
  }

  submit() {
    this.presentToast();
    this.themeService.setTheme(this.theme.value.classId);
    this.storage.set('active', 'yes');
    this.storage.set('course', this.course.value).then(() => {
        this.router.navigate(['tabs/home']);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.course.value + ' saved as selected course.',
      showCloseButton: true,
      closeButtonText: 'Dismiss',
      duration: 2000
    });
    toast.present();
  }

  get course() {
      return this.startForm.get('course');
  }
  get theme() {
      return this.startForm.get('theme');
  }
}
