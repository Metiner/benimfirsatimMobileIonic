import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, Events} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events
              ){}

  onLogIn(form:NgForm){

    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data=>{
      const loading = this.loadingCtrl.create({
        content : "Giriş yapılıyor..."
      });
      loading.present();
      if(data.json() != null && data.json().success == true ){

        this.eventCtrl.publish('user.login',' ');
        this.benimFirsatimLib.storageControl("email",data.json().email);
        this.navCtrl.push(TabsPage);
        loading.dismiss();
        this.benimFirsatimLib.showToast("Giriş yapıldı",1500,"bottom");

      }
    },error => {

      this.benimFirsatimLib.showAlert(" ","Yanlış e-mail veya parola girdiniz.",["Tamam"]);
    })
  };


  onSignUpButton(){
    this.navCtrl.push(SignupPage);
  }

}
