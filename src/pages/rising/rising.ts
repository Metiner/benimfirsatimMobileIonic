import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../modals/opportunity";

/**
 * Generated class for the RisingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rising',
  templateUrl: 'rising.html',
})
export class RisingPage {

  opportunities: Opportunity[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('rising').subscribe((data)=>{

      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

}
