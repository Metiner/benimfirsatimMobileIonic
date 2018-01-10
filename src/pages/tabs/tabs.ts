import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import {NavController} from "ionic-angular";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {CategoriesPage} from "../categories/categories";
@Component({
  selector: 'page-tabs',
  template: `

    
    <ion-tabs tabsPlacement ="bottom">
      <ion-tab [tabsHideOnSubPages]="true" [root]="highlightsPage" tabIcon="flash" tabTitle= "Öne Çıkanlar">
        <ion-icon name="flash"></ion-icon>
      </ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="risingPage" tabIcon="arrow-dropup-circle" tabTitle="Yükselenler" ></ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="topPage" tabIcon="add" tabTitle="Yeniler" ></ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="categoriesPage" tabIcon="albums" tabTitle="Kategoriler" ></ion-tab>

    </ion-tabs>
  `,
})
export class TabsPage {
  constructor(private navCtrl: NavController,
              private benimFirsatimLib: BenimfirsatimLib) {
  }

  highlightsPage = HighlightsPage;
  risingPage = RisingPage;
  topPage = TopPage;
  categoriesPage = CategoriesPage;


}
