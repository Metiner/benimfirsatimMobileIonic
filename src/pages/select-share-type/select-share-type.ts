import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";

/**
 * Generated class for the SelectShareTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-share-type',
  templateUrl: 'select-share-type.html',
})
export class SelectShareTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toLinkedDealPage(){
    this.navCtrl.push(CreateNewDealPage)
  }

}
