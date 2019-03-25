import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectureItemComponent } from '../lectures/lecture-item/lecture-item.component';
import {NewsItemComponent} from '../news/news-item/news-item.component';
import { EventItemComponent } from '../events/event-item/event-item.component';

@NgModule({
  declarations: [LectureItemComponent, NewsItemComponent, EventItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [LectureItemComponent, NewsItemComponent, EventItemComponent]
})
export class ComponentProviderModule { }
