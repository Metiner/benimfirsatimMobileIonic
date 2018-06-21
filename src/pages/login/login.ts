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
  onLoginLogo = false;


  itemone = true;

  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private eventCtrl: Events,
              private fb: Facebook,
              private googlePlus: GooglePlus,
              private platform: Platform,
              private fbService:FacebookService) {

    gapi.load('auth2', function() {
      const googleAut = gapi.auth2.init({client_id :'57374298212-94cgvbkf14685g846vcq95trf50qt69v.apps.googleusercontent.com'});

    });

    this.setItemsBooleanOpposite();
  }

  onLogIn(form: NgForm) {

    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data => {

      this.onLoginLogo = true;
      if (data.json() != null && data.json().success == true) {


        this.setItemsBooleanOpposite();


        setTimeout(() => {

            this.setStorageAndUserInfoAfterSuccessLogin(data.json(),1);

          }
          , 1100);

      }
    }, error => {

      this.benimFirsatimLib.showAlert(" ", "Yanlış e-mail veya parola girdiniz.", ["Tamam"]);
    })
  }


  onSignUpButton() {

    this.setItemsBooleanOpposite();

    setTimeout(() => {

        this.navCtrl.push(SignupPage);
      }
      , 1100);
  }

  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data,type) {
    const loading = this.loadingCtrl.create({
      content: "Giriş yapılıyor..."
    });
    loading.present();

    if(type === 2){
      this.benimFirsatimLib.setUserInfoAfterLogin(data);
      this.eventCtrl.publish('user.login', ' ');
      this.benimFirsatimLib.storageControl("user", data);
      this.navCtrl.push(TabsPage);
      loading.dismiss();
      this.benimFirsatimLib.showToast("Giriş yapıldı", 1500, "bottom");
    } else{
      this.benimFirsatimLib.setUserInfoAfterLogin(data.user);
      this.eventCtrl.publish('user.login', ' ');
      this.benimFirsatimLib.storageControl("user", data);
      this.navCtrl.push(TabsPage);
      loading.dismiss();
      this.benimFirsatimLib.showToast("Giriş yapıldı", 1500, "bottom");

    }

    }


  onFacebookLogin() {

    this.benimFirsatimLib.oAuth(1).subscribe(response => {
      this.setItemsBooleanOpposite();

      setTimeout(() => {

          this.setStorageAndUserInfoAfterSuccessLogin(response,2);
        }
        , 1000);

      BenimfirsatimLib.isLoggedInWithFacebook = true;
      this.navCtrl.push(TabsPage);
    })
  }

  onGooglePlusLogin() {



      this.benimFirsatimLib.oAuth(2).subscribe(response => {
        this.setItemsBooleanOpposite();

        setTimeout(() => {

            this.setStorageAndUserInfoAfterSuccessLogin(response,2);
          }
          , 1000);

        BenimfirsatimLib.isLoggedInWihGoogle = true;
        this.navCtrl.push(TabsPage);
      })

  }

  toTabsPage(){

    this.setItemsBooleanOpposite();

    setTimeout( ()=>{

        this.googlePlus.logout();
        this.navCtrl.push(TabsPage);
      }
      ,1000);
  }
  setItemsBooleanOpposite(){

      setTimeout(()=>{
        this.itemone=! this.itemone;
      },0)}
}
