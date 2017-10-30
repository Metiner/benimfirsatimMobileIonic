import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BenimfirsatimLib} from "../../app/benimfirsatimLib";

/**
 * Generated class for the HighlightsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-highlights',
  templateUrl: 'highlights.html',
})
export class HighlightsPage {

  hotDeals = null;

  constructor(public navCtrl: NavController,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('hot').subscribe((data)=>{
      this.hotDeals = data;
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HighlightsPage');
  }
  
}
