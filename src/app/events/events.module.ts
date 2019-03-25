import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';

import { ComponentProviderModule } from '../component-provider/component-provider.module';


const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentProviderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
