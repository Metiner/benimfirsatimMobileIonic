import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, Events} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";
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
              private googlePlus:GooglePlus){}

  onLogIn(form:NgForm){

    console.log(form)
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

        console.log(res);
        var fbValues = "&fields=id,name,location,website,picture,email";
        var fbPermission = ["public_profile"];
        var authResponse= res.authResponse;

        this.fb.api("me?"+ fbValues, fbPermission).then(response=>{
          console.log(response);
          let email = response.email;
          let name = response.name;
          let id = response.id;
          let picture = response.picture.data.url;
          this.benimFirsatimLib.signupOrLogin(email,name,picture,id,authResponse,"facebook").subscribe(response=>{

            // It means, email is already being used by another user.
            if(!response.json().success){
              this.benimFirsatimLib.showToast(response.json().message,3000,"bottom");

            }
            if(response.json() != null && response.json().success == true ) {
              this.setStorageAndUserInfoAfterSuccessLogin(response.json());
              BenimfirsatimLib.isLoggedInWithFacebook = true;
              this.navCtrl.push(TabsPage);

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

    this.googlePlus.login({}).then(response=>{
      let email = response.email;
      let name = response.displayName;
      let id = response.userId;
      let picture = response.imageUrl;


      this.benimFirsatimLib.signupOrLogin(email,name,picture,id,response,"google").subscribe(response=>{



        // It means, email is already being used by another user.
        if(!response.json().success){
          this.benimFirsatimLib.showToast(response.json().message,3000,"bottom");

        }
        if(response.json() != null && response.json().success == true ) {
          this.setStorageAndUserInfoAfterSuccessLogin(response.json());
          BenimfirsatimLib.isLoggedInWihGoogle = true;
          this.navCtrl.push(TabsPage);
        }

      }, error=>{
        this.benimFirsatimLib.showToast("Bir hata oluştu",1500,"bottom");
        console.log(error.toLocaleString());
      })
    }).catch(e=>{
      console.log('Error logging into Google Plus', e)});

  }

  toTabsPage(){
    this.googlePlus.logout();
    this.navCtrl.push(TabsPage);
  }

}
