import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecturesPage } from './lectures.page';
import { ComponentProviderModule } from '../component-provider/component-provider.module';

const routes: Routes = [
  {
    path: '',
    component: LecturesPage
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
  declarations: [LecturesPage]
})
export class LecturesPageModule {}
