import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl:NavController,
              private loadingCtrl: LoadingController,
              private eventCtrl: Events){}

  onSignUp(form: NgForm){

    //check if passwords are different
    if(form.value.password !== form.value.passwordTwo){
      this.benimFirsatimLib.showToast("Parolalar uyuşmamakta",3000,"bottom");
    }else{


      const loading = this.loadingCtrl.create({
        content: "Lütfen bekleyiniz..."
      });
      loading.present();
      this.benimFirsatimLib.signUp(form.value.email, form.value.password, form.value.username).subscribe(data=>{

        if(data.ok){


          let responseData = data.json();
          responseData.token = data.headers.get('Authorization');
          this.setStorageAndUserInfoAfterSuccessLogin(responseData);
        }
        loading.dismiss();

      },error => {
        this.benimFirsatimLib.showAlert(" ", "Email veya kullanıcı adı kullanılmakta.", ["Tamam"]);
        loading.dismiss();

      })
      }
  }

  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data) {



    this.benimFirsatimLib.setUserInfoAfterLogin(data);
    this.eventCtrl.publish('user.login', ' ');

    this.benimFirsatimLib.storageControl("bf-auth", data);
    this.navCtrl.push(TabsPage);
    this.benimFirsatimLib.showToast("Kayıt yapıldı", 1500, "bottom");


  }
  toTabsPage(){
    this.navCtrl.popToRoot();
  }


}
