import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Camera} from "@ionic-native/camera";


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

  base64Image;
  base64ImageToUpload = "";
  user:User;
  photoTaken = false;
  constructor(private benimFirsatimLib:BenimfirsatimLib,
              public navParams: NavParams,
              public navCtrl:NavController,
              private camera:Camera,) {
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

  onProfileChangesSave(f){

    this.benimFirsatimLib.updateUser(f.value.nickname,f.value.password).subscribe(response=>{

    });

  }

  goBack(){
   this.navCtrl.pop();
  }


  onTakePhoto(){

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.photoTaken = true;
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      let base64 = this.base64Image.split(',');
      this.base64ImageToUpload=base64[1].trim();

    }, (err) => {
      console.log(err);
      this.photoTaken = false;
    });
  }
}
