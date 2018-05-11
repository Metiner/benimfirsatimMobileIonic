import {BrowserModule} from "@angular/platform-browser";
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
import {RouterModule} from "@angular/router";

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
import {SettingsPage} from "../pages/settings/settings";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {GooglePlus} from "@ionic-native/google-plus";
import {OneSignal} from "@ionic-native/onesignal";
import {MyDealsPage} from "../pages/my-deals/my-deals";
import {ListDealComponent} from "../components/list-deal/list-deal";
import {FabCompenent} from "../components/fab/fab";
import {BrowserTab} from "@ionic-native/browser-tab";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {PointsPage} from "../pages/points/points";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FacebookModule} from "ngx-facebook";
import {FeedbackComponent} from "../components/feedback/feedback";
import {A2tUiModule, Angular2TokenService} from "angular2-token-ionic3";
import {InAppBrowser} from "@ionic-native/in-app-browser";

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
    SettingsPage,
    MyDealsPage,
    ListDealComponent,
    FabCompenent,
    PointsPage,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FacebookModule.forRoot(),
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp,{backButtonText: 'Geri'}),
    IonicStorageModule.forRoot({driverOrder: ['indexeddb', 'websql', 'sqlite']}),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB4HjxYVe5iOu4dzGhaDfq1vtCzmiMCg1U'
    }),
    A2tUiModule
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
    SettingsPage,
    MyDealsPage,
    PointsPage
  ],
  providers: [
    StatusBar,
    BenimfirsatimLib,
    SplashScreen,
    Facebook,
    GooglePlus,
    GoogleAnalytics,
    OneSignal,
    BrowserTab,
    Camera,
    File,
    InAppBrowser,
    Angular2TokenService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
