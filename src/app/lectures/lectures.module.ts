import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LecturesPage } from './lectures.page';
import { LectureItemComponent } from './lecture-item/lecture-item.component'

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
    RouterModule.forChild(routes)
  ],
  declarations: [LecturesPage, LectureItemComponent]
})
export class LecturesPageModule {}
