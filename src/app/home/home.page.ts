import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomeService } from './home.service';
import { Mensa } from './mensa.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensa: Mensa;
  isReady: boolean;

  constructor(private storage: Storage, private homeService: HomeService) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.mensa = null;
    this.isReady = false;
    this.homeService.getMensaplan().subscribe((mensa: Mensa) => {
      this.mensa = mensa;
      this.isReady = true;
      console.log(this.mensa);
    });
  }

}
