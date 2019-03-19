import {Component, Input, OnInit} from '@angular/core';
import {Lecture} from '../lecture.model';

@Component({
  selector: 'app-lecture-item',
  templateUrl: './lecture-item.component.html',
  styleUrls: ['./lecture-item.component.scss'],
})
export class LectureItemComponent implements OnInit {
  @Input() lecturesDate: Date;
  @Input() lectureList: Lecture[];

  constructor() { }

  ngOnInit() { }

}
