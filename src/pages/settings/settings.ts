import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  user:User;
  constructor(private benimFirsatimLib:BenimfirsatimLib, public navParams: NavParams,public navCtrl:NavController) {
    this.user = BenimfirsatimLib.user;
  }

  itemone;
  itemtwo;

  ionViewWillEnter(){
      this.benimFirsatimLib.checkAuthFromStorage().then( response =>{
      this.user = response.user;
    }).catch(error=>{
      console.log(error);
      })

    this.itemone = 'toLogoUp';
    this.itemtwo = 'toLogoUp';

  }

  onChangeAvatar(){
      this.benimFirsatimLib.presentActionSheet("Profil Fotoğrafını Değiştir",[
        {
          text:'Fotoğraf çek',
          handler: ()=>{

          }
        },
        {
          text:'Kütüphaneden seç',
          handler: ()=>{

          }
        }
      ])
  }

  onProfileChangesSave(){

  }

  goBack(){
   this.navCtrl.pop();
  }

}
