import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {BenimfirsatimLib} from "../services/benimfirsatimLib";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public isAuthenticated = false;
  @ViewChild('nav') nav: NavController;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl:MenuController,
              private benimFirsatimLib:BenimfirsatimLib,
              private eventCtrl:Events) {
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

}

