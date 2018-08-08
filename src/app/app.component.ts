import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {BenimfirsatimLib} from "../services/benimfirsatimLib";
import {SettingsPage} from "../pages/settings/settings";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {GooglePlus} from "@ionic-native/google-plus";
import {Facebook} from "@ionic-native/facebook";
import {OneSignal} from "@ionic-native/onesignal";
import {MyDealsPage} from "../pages/my-deals/my-deals";
import {PointsPage} from "../pages/points/points";
import {Angular2TokenService} from "angular2-token-ionic3";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public isAuthenticated = false;
  settingsPage = SettingsPage;
  myDealsPage = MyDealsPage;
  searchParam = "";

  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private benimFirsatimLib:BenimfirsatimLib,
              private eventCtrl:Events,
              private gA:GoogleAnalytics,
              private oneSignal:OneSignal,
              private googlePlusLogin:GooglePlus,
              private facebookLogin:Facebook,
              private _tokenService: Angular2TokenService) {

    this._tokenService.init({
      apiBase:                    null,
      apiPath:                    'https://api.benimfirsatim.com',

      signInPath:                 'auth/sign_in',
      signInRedirect:             null,
      signInStoredUrlStorageKey:  null,

      signOutPath:                'auth/sign_out',
      validateTokenPath:          'auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        'auth',
      deleteAccountPath:          'auth',
      registerAccountCallback:    window.location.href,

      updatePasswordPath:         'auth',
      resetPasswordPath:          'auth/password',
      resetPasswordCallback:      window.location.href,

      oAuthBase:                  'https://api.benimfirsatim.com',

      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
        headers: {
          'Content-Type':     'application/json',
          'Accept':           'application/json'
        }
      }
    });




    this.eventCtrl.subscribe("user.login", () => { this.isAuthenticated = true});
    let response = benimFirsatimLib.checkAuthFromStorage()
      if(response != null){
        this.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();

    this.nav.setRoot(TabsPage);
    let responseTwo = this.benimFirsatimLib.checkAuthFromStorage()
      if(response != null) {
        BenimfirsatimLib.user = responseTwo;
        //BenimfirsatimLib.token = response.token;


        /*// onesignal code start:
        this.oneSignal.startInit('e3b6a1f6-1826-4015-a0c5-99665f5a9589', '57374298212');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

        this.oneSignal.endInit()*/
        //for starting google analytics
      }
      this.gA.startTrackerWithId('UA-44910726-2')
        .then(() => {
          this.gA.trackView('test');
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    });
  }
  onSignin(){
    this.nav.push(LoginPage);
    this.menuCtrl.close();
  }

  onLogout(){

      /*// sign out if user signed in with google account
      if(BenimfirsatimLib.isLoggedInWihGoogle){
        this.googlePlusLogin.logout();
      }

    // sign out if user signed in with Facebook account
    if(BenimfirsatimLib.isLoggedInWithFacebook){
        this.facebookLogin.logout();
      }*/

      this.benimFirsatimLib.logOutFromStorageAndAuth();
      this.menuCtrl.close();
      this.nav.setRoot(TabsPage);
      this.benimFirsatimLib.showToast("Çıkış yapıldı",2000,"bottom");
      localStorage.clear()


      this.isAuthenticated = false;


    }

    onSettings(){
      this.nav.push(this.settingsPage);
      this.menuCtrl.close();
    }

    onNotifications(){
      this.nav.push(PointsPage);
      this.menuCtrl.close();
      /*this.benimFirsatimLib.getUserLog().subscribe( response =>{
        console.log(response.json());
      },
        error =>{
        console.log(error.toLocaleString());
        })*/
    }

    onMyDeals(){
      this.nav.push(this.myDealsPage);
      this.menuCtrl.close();
    }
  onSearchEvent(event){

    // if(event.key === 'Backspace'){
    //   this.searchParam = this.searchParam.slice(0,-1);
    //   if(event.srcElement.value.length === 0){
    //     this.searchParam = "";
    //   }
    // }
    // if(event.key.length < 2){
    //   this.searchParam += event.key;
      // if(this.searchParam.length > 2 && this.searchParam.length % 2 == 0){
      //   this.benimFirsatimLibrary.search(this.searchParam).subscribe(response=>{
      //     this.searchResponse = response.json().entries;
      //   })
      // }
    // }
  }

}

