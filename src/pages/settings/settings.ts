import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Camera} from "@ionic-native/camera";
import {forEach} from "@angular/router/src/utils/collection";


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
  user:any;
  photoTaken = false;
  constructor(private benimFirsatimLib:BenimfirsatimLib,
              public navParams: NavParams,
              public navCtrl:NavController,
              private camera:Camera,) {
    this.user = BenimfirsatimLib.user;
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

    if(f.value.password === null){
      f.value.password = "";
    }

    if(f.value.passwordTwo === null){
      f.value.passwordTwo = "";
    }
    if(f.value.password !== f.value.passwordTwo){
      this.benimFirsatimLib.showToast("PAROLALAR FARKLI!",3000,'bottom');
    }else{
      this.benimFirsatimLib.updateUser(f.value.nickname,f.value.password,f.value.current_password).subscribe(response=>{
        if(response.ok){
          this.benimFirsatimLib.showToast('Başarıyla güncellendi.',3000,'bottom');
          this.navCtrl.pop();
        }
      },error2 => {
        let error_message = "";
        for(let k in error2.json().errors){
          error_message += k + ' ' + error2.json().errors[k] + ' ,';
        }

        this.benimFirsatimLib.showToast(error_message.toUpperCase(),3000,'bottom');

      });
    }
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
