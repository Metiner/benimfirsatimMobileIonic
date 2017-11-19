import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {HighlightsPage} from "../pages/highlights/highlights";
import {RisingPage} from "../pages/rising/rising";
import {CategoriesPage} from "../pages/categories/categories";
import {TopPage} from "../pages/top/top";
import {HttpModule} from "@angular/http";


import {BenimfirsatimLib} from "../services/benimfirsatimLib";
import {OpportunityPage} from "../pages/opportunity/opportunity";
import {DenemePage} from "../pages/deneme/deneme";
import {SignupPage} from "../pages/signup/signup";
import {LoginPage} from "../pages/login/login";
import {IonicStorageModule} from "@ionic/storage";
import {CreateNewDealPage} from "../pages/create-new-deal/create-new-deal";
import {SetLocationPage} from "../pages/set-location/set-location";
import {AgmCoreModule} from "angular2-google-maps/core";
import {SelectedCategoryPage} from "../pages/selected-category/selected-category";
import {Facebook} from "@ionic-native/facebook";
import {OnCommentReplyPage} from "../pages/on-comment-reply/on-comment-reply";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SettingsPage} from "../pages/settings/settings";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HighlightsPage,
    RisingPage,
    CategoriesPage,
    TopPage,
    OpportunityPage,
    DenemePage,
    SignupPage,
    LoginPage,
    CreateNewDealPage,
    SetLocationPage,
    SelectedCategoryPage,
    OnCommentReplyPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp,{backButtonText: 'Geri'}),
    IonicStorageModule.forRoot({driverOrder: ['indexeddb', 'websql', 'sqlite']}),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB4HjxYVe5iOu4dzGhaDfq1vtCzmiMCg1U'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HighlightsPage,
    RisingPage,
    CategoriesPage,
    TopPage,
    OpportunityPage,
    DenemePage,
    LoginPage,
    SignupPage,
    CreateNewDealPage,
    SetLocationPage,
    SelectedCategoryPage,
    OnCommentReplyPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    BenimfirsatimLib,
    SplashScreen,
    Facebook,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
