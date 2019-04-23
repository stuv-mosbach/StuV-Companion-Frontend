import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import {ThemeService} from '../theming/theme.service';
import {Theme} from '../theming/theme.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  courses: any[];
  themes: Theme[];

  selectedCourse: string;
  selectedTheme: Theme;

  constructor(
    private settingsService: SettingsService,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
    private themeService: ThemeService,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.startForm = this.fb.group({
    //     course: ['', [
    //         Validators.required
    //     ]],
    //     theme: ['', [
    //         Validators.required
    //     ]]
    // });
  }

  ionViewDidEnter() {
    this.settingsService.getAllCourses().subscribe((list: string[]) => {
      this.courses = list;
      this.courses.sort();
    });
    this.themes = this.themeService.getAllThemes();
    this.themeService.getTheme().subscribe((data: Theme) => {
      selectedTheme = data;
    })
    this.storage.get('course').then((data: string) => {
      selectedCourse = data;
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Dismiss',
      duration: 2000
    });
    toast.present();
  }
}
