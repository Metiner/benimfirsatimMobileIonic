import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {BenimfirsatimLib} from "../services/benimfirsatimLib";
import {SettingsPage} from "../pages/settings/settings";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public isAuthenticated = false;
  settingsPage = SettingsPage;
  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private benimFirsatimLib:BenimfirsatimLib,
              private eventCtrl:Events,
              private gA:GoogleAnalytics) {

    this.eventCtrl.subscribe("user.login", () => { this.isAuthenticated = true});
    if(benimFirsatimLib.checkAuthFromStorage()){
      this.isAuthenticated = true;
      this.nav.setRoot(TabsPage);
    }else{
      this.isAuthenticated = false;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();



      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("e3b6a1f6-1826-4015-a0c5-99665f5a9589", "57374298212")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();




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

}

