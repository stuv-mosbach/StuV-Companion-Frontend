import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ThemeService } from '../theming/theme.service';
import { Theme } from '../theming/theme.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SettingsService } from './settings.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController } from '@ionic/angular';
import { AboutPage } from './about/about.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  courses: any[];
  themes: Theme[];
  settingsForm: FormGroup;

  selectedCourse: string;
  selectedTheme: string;

  constructor(
    private settingsService: SettingsService,
    private toastController: ToastController,
    private storage: Storage,
    private router: Router,
    private themeService: ThemeService,
    private fb: FormBuilder,
    private emailComposer: EmailComposer,
    private modalController: ModalController) { }

  ngOnInit() {
    this.ionViewDidEnter()
  }

  ionViewDidEnter() {
    this.settingsService.getAllCourses().subscribe((list: string[]) => {
      this.courses = list;
      this.courses.sort();
    });
    this.themes = this.themeService.getAllThemes();
    this.themeService.getTheme().subscribe((data: string) => {
      this.selectedTheme = data;
    })
    this.storage.get('course').then((data: string) => {
      this.selectedCourse = data;
    });
    this.settingsForm = this.fb.group({
      course: [this.selectedCourse, [Validators.required]],
      theme: [this.themes[this.themes.map(function (e) { return e.classId }).indexOf(this.selectedTheme)], [Validators.required]]
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

  courseChanged(event: {component: IonicSelectableComponent, value: any}) {
    this.storage.set('course', event.value).then(() => {
      this.presentToast('Course set to ' + event.value)
    })
    console.log(event.value)
  }

  themeChanged(event: {component: IonicSelectableComponent, value: any}) {
    this.themeService.setTheme(event.value.classId)
    this.presentToast('Theme set to ' + event.value.name)
  }

  get course() {
    return this.settingsForm.get('course');
  }
  get theme() {
    return this.settingsForm.get('theme');
  }

  sendBugReport() {
      let email = {
        to: 'it@stuv-mosbach.de',
        cc: 'bugs@roth-kl.de',
        subject: '[BugReport] Bug in der StuV Companion Beta',
        body: 'Bitte hier den Fehler erklären!',
        isHtml: true
      }

      this.emailComposer.open(email);
  }

  async showAbout() {
    const modal = await this.modalController.create({
      component: AboutPage
    });
    return await modal.present();
  }
}
