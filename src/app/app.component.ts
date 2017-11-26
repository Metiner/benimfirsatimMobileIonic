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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public isAuthenticated = false;
  settingsPage = SettingsPage;
  myDealsPage = MyDealsPage;
  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private benimFirsatimLib:BenimfirsatimLib,
              private eventCtrl:Events,
              private gA:GoogleAnalytics,
              private oneSignal:OneSignal,
              private googlePlusLogin:GooglePlus,
              private facebookLogin:Facebook) {


    this.eventCtrl.subscribe("user.login", () => { this.isAuthenticated = true});
    benimFirsatimLib.checkAuthFromStorage().then( response=>{
      if(response != null){
        this.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }
      }).catch(error=>{
        this.benimFirsatimLib.showToast(error.toLocaleString(),3000,'bottom');
      }
    )

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();

    this.nav.setRoot(TabsPage);


      // onesignal code start:
      this.oneSignal.startInit('e3b6a1f6-1826-4015-a0c5-99665f5a9589', '57374298212');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();

      // for starting google analytics

      this.gA.startTrackerWithId('UA-44910726-2')
        .then(() => {
          console.log('Google analytics is ready now');
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

      // sign out if user signed in with google account
      if(BenimfirsatimLib.isLoggedInWihGoogle){
        this.googlePlusLogin.logout();
      }

    // sign out if user signed in with Facebook account
    if(BenimfirsatimLib.isLoggedInWithFacebook){
        this.facebookLogin.logout();
      }

      this.benimFirsatimLib.logOutFromStorageAndAuth();
      this.menuCtrl.close();
      this.nav.setRoot(TabsPage);
      this.benimFirsatimLib.showToast("Çıkış yapıldı",2000,"bottom");

      //Executes the code after waiting a second.
      setTimeout(()=>{
        this.isAuthenticated = false;
      },1000)

    }

    onSettings(){
      this.nav.push(this.settingsPage);
      this.menuCtrl.close();
    }

    onNotifications(){
      this.benimFirsatimLib.getUserLog().subscribe( response =>{
        console.log(response.json());
      },
        error =>{
        console.log(error.toLocaleString());
        })
    }

    onMyDeals(){
      this.nav.push(this.myDealsPage);
    }

}

