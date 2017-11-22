import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, Events} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
import {Facebook} from "@ionic-native/facebook";
import {Http} from "@angular/http";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {



  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events,
              private fb:Facebook,
              private http:Http){}

  onLogIn(form:NgForm){

    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data=>{

      console.log(data.json());
      if(data.json() != null && data.json().success == true ){

        this.setStorageAndUserInfoAfterSuccessLogin(data.json());

      }
    },error => {

      this.benimFirsatimLib.showAlert(" ","Yanlış e-mail veya parola girdiniz.",["Tamam"]);
    })
  };


  onSignUpButton(){
    this.navCtrl.push(SignupPage);
  }

  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data){
    const loading = this.loadingCtrl.create({
      content : "Giriş yapılıyor..."
    });
    loading.present();

    this.benimFirsatimLib.setUserInfoAfterLogin(data.user);
    this.eventCtrl.publish('user.login',' ');
    this.benimFirsatimLib.storageControl("user",data);
    this.navCtrl.push(TabsPage);
    loading.dismiss();
    this.benimFirsatimLib.showToast("Giriş yapıldı",1500,"bottom");
  }


  onFacebookLogin(){

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res =>{

        var fbValues = "&fields=id,name,location,website,picture,email";
        var fbPermission = ["public_profile"];

        this.fb.api("me?"+ fbValues, fbPermission).then(response=>{
          let email = response.email;
          let name = response.name;
          let id = response.id;
          let picture = response.picture.data.url;
          this.benimFirsatimLib.signupOrLogin(email,name,picture,id,"facebook").subscribe(response=>{
            console.log(response.json());
            // It means, email is already being used by another user.
            if(response.json().email == ''){

            }
            if(response.json() != null && response.json().success == true ) {
              this.setStorageAndUserInfoAfterSuccessLogin(response.json());
            }
          }, error=>{
            this.benimFirsatimLib.showToast("Bir hata oluştu",1500,"bottom");
            console.log(error.toLocaleString());
          })
        });
        },

      )
      .catch(e => console.log('Error logging into Facebook', e));
  }

  onGooglePlusLogin(){

  }

  toTabsPage(){
    this.navCtrl.push(TabsPage);
  }

}
