import {Component, QueryList, ViewChildren} from '@angular/core';
import {IonicPage, LoadingController, NavController, Events, Platform} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";
import { FacebookService} from "ngx-facebook";
declare var gapi:any;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  @ViewChildren('content') rows: QueryList<any>;
  onLoginLogo = true;
  email= "";
  password="";
  remember_me;


  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private eventCtrl: Events,
              private fb: Facebook,
              private googlePlus: GooglePlus,
              private platform: Platform,
              private fbService:FacebookService) {

    /*gapi.load('auth2', function() {
      const googleAut = gapi.auth2.init({client_id :'57374298212-94cgvbkf14685g846vcq95trf50qt69v.apps.googleusercontent.com'});

    });*/

  }

  ionViewWillEnter(){
    this.fill_input_due_remember_me();
  }

  fill_input_due_remember_me(){

    if(localStorage.getItem("password") !== null){
      this.email = localStorage.getItem("user_email");
      this.password = localStorage.getItem("password");
      this.remember_me = true;
    }else{
      this.remember_me = false;
    }
  }

  onLogIn(form: NgForm) {

    if(form.value.remember_me){
      localStorage.setItem("user_email", form.value.email);
      localStorage.setItem("password", form.value.password);
      localStorage.setItem("remember_me", "true");
    }else{
      localStorage.removeItem("user_email");
      localStorage.removeItem("password");
      localStorage.removeItem("remember_me");
    }

    const loading = this.loadingCtrl.create({
      content: "Giriş yapılıyor..."
    });
    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data => {
      loading.present();
      this.onLoginLogo = true;
      if(data.ok){
        let responseData = data.json();
        responseData.token = data.headers.get('Authorization');
        this.setStorageAndUserInfoAfterSuccessLogin(responseData);
        this.benimFirsatimLib.showToast("Giriş yapıldı", 1500, "bottom");
        loading.dismiss();
      }
    },error => {
      this.benimFirsatimLib.showAlert(" ", "Geçersiz e-mail veya parola girdiniz.", ["Tamam"]);
      loading.dismiss();
    })
  }

  onSignUpButton() {
      this.navCtrl.push(SignupPage);
  }

  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data) {

      this.benimFirsatimLib.setUserInfoAfterLogin(data);
      this.eventCtrl.publish('user.login', ' ');

      this.benimFirsatimLib.storageControl("bf-auth", data);
      this.navCtrl.push(TabsPage);

    }


  onFacebookLogin() {

    this.benimFirsatimLib.facebook_login();
    /*this.benimFirsatimLib.facebook_login().subscribe(response => {

      /!*
      this.setStorageAndUserInfoAfterSuccessLogin(response,2);

      BenimfirsatimLib.isLoggedInWithFacebook = true;
      this.navCtrl.push(TabsPage);*!/
    })*/
  }

  onGooglePlusLogin() {



      this.benimFirsatimLib.google_login().subscribe(response => {
        /*this.setStorageAndUserInfoAfterSuccessLogin(response,2);

        BenimfirsatimLib.isLoggedInWihGoogle = true;
        this.navCtrl.push(TabsPage);*/
      })

  }
}
