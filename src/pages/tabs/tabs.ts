import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import {CategoriesPage} from "../categories/categories";

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs tabsPlacement ="top">
      <ion-tab [root]="highlightsPage" tabTitle= "Highlights"></ion-tab>
      <ion-tab [root]="risingPage" tabTitle="Rising" ></ion-tab>
      <ion-tab [root]="topPage" tabTitle="Top" ></ion-tab>
      <ion-tab [root]="categoriesPage" tabTitle="Categories"></ion-tab>
    </ion-tabs>
    `,
})
export class TabsPage {

  highlightsPage = HighlightsPage;
  risingPage = RisingPage;
  topPage = TopPage;
  categoriesPage = CategoriesPage;

}
