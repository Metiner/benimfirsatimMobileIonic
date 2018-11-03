import {Component, NgZone, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
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
import {HighlightsPage} from "../pages/highlights/highlights";
import {TopPage} from "../pages/top/top";
import {RisingPage} from "../pages/rising/rising";
import {SelectedCategoryPage} from "../pages/selected-category/selected-category";
declare const FB:any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  static isAuthenticated = false;
  settingsPage = SettingsPage;
  myDealsPage = MyDealsPage;
  searchParam = "";

  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar,
              private menuCtrl:MenuController,
              private benimFirsatimLib:BenimfirsatimLib,
              private eventCtrl:Events,
              private gA:GoogleAnalytics,
              private oneSignal:OneSignal,
              private googlePlusLogin:GooglePlus,
              private facebookLogin:Facebook,
              private zone: NgZone) {


    this.eventCtrl.subscribe("user.login", () => { MyApp.isAuthenticated = true
    console.log(MyApp.isAuthenticated)
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();

      this.check_auth();
      /*// onesignal code start:
      this.oneSignal.startInit('e3b6a1f6-1826-4015-a0c5-99665f5a9589', '57374298212');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit()
      //for starting google analytics*/

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
    this.nav.push('LoginPage');
    this.menuCtrl.close();
  }
  public check_auth(){
    this.benimFirsatimLib.check_auth().then( response => {
      if(response){
        MyApp.isAuthenticated = true;
        this.zone.run(() => {
          this.nav.setRoot(TabsPage)
        });
      }else{
        this.nav.setRoot('LoginPage');
        MyApp.isAuthenticated = false;
      }
    }).catch( e => {
      this.nav.setRoot('LoginPage');
      MyApp.isAuthenticated = false;
    })
  }

  onLogout(){

      this.benimFirsatimLib.destroy_session().subscribe( response => {
        this.benimFirsatimLib.logOutFromStorageAndAuth();
        this.menuCtrl.close();
        this.nav.setRoot('LoginPage');
        this.benimFirsatimLib.showToast("Çıkış yapıldı",2000,"bottom");
        localStorage.removeItem("bf-auth");

        this.set_paginations_default();

        MyApp.isAuthenticated = false;
      }, error =>{
        this.benimFirsatimLib.showToast("Çıkış yaparken, uygulama paket oldu", 3000, 'bottom');
      })
    }

    set_paginations_default(){
      HighlightsPage.pagination = 1;
      TopPage.pagination = 1;
      RisingPage.pagination = 1;
      SelectedCategoryPage.pagination = 1;
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
  get_autho_status(){
    return MyApp.isAuthenticated;
  }

}

