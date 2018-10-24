import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {

  users= [];

  constructor(public benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.benimFirsatimLib.getUsersTop().subscribe(response=>{
      for(let i = 0 ;i<response.json().users.length;i++){
        this.users.push(response.json().users[i]);
      }
    })
  }


  goBack(){
    this.navCtrl.pop();
  }
  toTabsPage(){
    this.navCtrl.popToRoot();
  }
}
