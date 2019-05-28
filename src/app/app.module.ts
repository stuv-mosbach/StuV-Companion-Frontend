import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicSelectableModule } from 'ionic-selectable';
import {ReactiveFormsModule} from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AboutPageModule } from './settings/about/about.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CacheModule } from 'ionic-cache-observable';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [CacheModule, BrowserModule, AboutPageModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), IonicSelectableModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ReactiveFormsModule,
    EmailComposer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
