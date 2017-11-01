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

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HighlightsPage,
    RisingPage,
    CategoriesPage,
    TopPage,
    OpportunityPage,
    DenemePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
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
    DenemePage
  ],
  providers: [
    StatusBar,
    BenimfirsatimLib,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
