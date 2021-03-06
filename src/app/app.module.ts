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
import {AdMobPro} from "@ionic-native/admob-pro";
import {SelectShareTypePage} from "../pages/select-share-type/select-share-type";
import {CreateNewDealWithPhotoPage} from "../pages/create-new-deal-with-photo/create-new-deal-with-photo";
import {Geolocation} from "ionic-native";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {RlTagInputModule} from "angular2-tag-input/dist";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {SignupPageModule} from "../pages/signup/signup.module";
import {HighlightsPageModule} from "../pages/highlights/highlights.module";
import {ComponentsModule} from "../components/components.module";
import {SelectedCategoryPageModule} from "../pages/selected-category/selected-category.module";
import {TopPageModule} from "../pages/top/top.module";
import {CategoriesPageModule} from "../pages/categories/categories.module";
import {RisingPageModule} from "../pages/rising/rising.module";
import {MyDealsPageModule} from "../pages/my-deals/my-deals.module";
import {LoginPageModule} from "../pages/login/login.module";
import {ImagePicker} from "@ionic-native/image-picker";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OpportunityPage,
    DenemePage,
    CreateNewDealPage,

    OnCommentReplyPage,
    SettingsPage,
    FabCompenent,
    PointsPage,
    SelectShareTypePage,
    CreateNewDealWithPhotoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FacebookModule.forRoot(),
    BrowserAnimationsModule,
    CurrencyMaskModule,
    RlTagInputModule,
    IonicModule.forRoot(MyApp,{backButtonText: 'Geri'}),
    IonicStorageModule.forRoot({driverOrder: ['indexeddb', 'websql', 'sqlite']}),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCXpRW3Ms9iZ6FfUslL_xLDZ40jfyI5E4Q'
    }),
    A2tUiModule,
    SignupPageModule,
    HighlightsPageModule,
    RisingPageModule,
    CategoriesPageModule,
    TopPageModule,
    SelectedCategoryPageModule,
    MyDealsPageModule,
    LoginPageModule

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
    SelectedCategoryPage,
    OnCommentReplyPage,
    SettingsPage,
    MyDealsPage,
    PointsPage,
    SelectShareTypePage,
    CreateNewDealWithPhotoPage
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
    AdMobPro,
    LaunchNavigator,
    Geolocation,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
