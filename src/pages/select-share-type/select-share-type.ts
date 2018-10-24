import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";
import {CreateNewDealWithPhotoPage} from "../create-new-deal-with-photo/create-new-deal-with-photo";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {MyApp} from "../../app/app.component";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public benimFirsatimLib: BenimfirsatimLib) {

  }

  ionViewWillEnter(){
    this.benimFirsatimLib.check_auth().then( response => {
      if(response){
        MyApp.isAuthenticated = true;
      }else{
        this.navCtrl.setRoot(LoginPage);
        MyApp.isAuthenticated = false;
      }
    }).catch( e => {
      this.navCtrl.setRoot(LoginPage);
      MyApp.isAuthenticated = false;
    })
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
