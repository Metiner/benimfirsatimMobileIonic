import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import {CategoriesPage} from "../categories/categories";
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";

@Component({
  selector: 'page-tabs',
  template: `
    
    <ion-fab right bottom>
      <button ion-fab
              [navPush]="createNewDealPage">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-fab>
    <ion-tabs tabsPlacement ="top">
      <ion-tab [root]="highlightsPage" tabTitle= "Öne Çıkanlar"></ion-tab>
      <ion-tab [root]="risingPage" tabTitle="Yükselenler" ></ion-tab>
      <ion-tab [root]="topPage" tabTitle="Yeniler" ></ion-tab>
      <ion-tab [root]="categoriesPage" tabTitle="Kategoriler"></ion-tab>
    </ion-tabs>
    `,
})
export class TabsPage {

  highlightsPage = HighlightsPage;
  risingPage = RisingPage;
  topPage = TopPage;
  categoriesPage = CategoriesPage;
  createNewDealPage = CreateNewDealPage;

}
