import { Component } from '@angular/core';
import { IonicPage,NavParams } from 'ionic-angular';
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
  constructor(private benimFirsatimLib:BenimfirsatimLib, public navParams: NavParams) {
    this.user = BenimfirsatimLib.user;
  }


  ionViewWillEnter(){
      this.benimFirsatimLib.checkAuthFromStorage().then( response =>{
      this.user = response.user;
    }).catch(error=>{
      console.log(error);
      })
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


}
