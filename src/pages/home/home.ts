import { Component } from '@angular/core';
import { Loading,NavController } from 'ionic-angular';
import {BenimfirsatimLib} from "../../app/benimfirsatimLib";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hotDeals = null;

  constructor(public navCtrl: NavController,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('hot').subscribe((data)=>{
      this.hotDeals = data;
    })
  }



}
