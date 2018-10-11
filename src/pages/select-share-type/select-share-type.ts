import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";
import {CreateNewDealWithPhotoPage} from "../create-new-deal-with-photo/create-new-deal-with-photo";
import {TabsPage} from "../tabs/tabs";

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

  to_linked_deal_page(){
    this.navCtrl.push(CreateNewDealPage)
  }
  to_linked_deal_page_with_photo(){
    this.navCtrl.push(CreateNewDealWithPhotoPage)
  }
  toTabsPage(){
    this.navCtrl.popToRoot();
  }
}
