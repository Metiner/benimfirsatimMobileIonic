import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import {CategoriesPage} from "../categories/categories";
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";
import {NavController} from "ionic-angular";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-tabs',
  template: `

    <ion-fab right bottom>
      <button ion-fab
              (click)="onCreateNewDeal()">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-fab>
    <ion-tabs tabsPlacement ="top">
      <ion-tab [tabsHideOnSubPages]="true" [root]="highlightsPage" tabTitle= "Öne Çıkanlar"></ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="risingPage" tabTitle="Yükselenler" ></ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="topPage" tabTitle="Yeniler" ></ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="categoriesPage" tabTitle="Kategoriler"></ion-tab>

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
  createNewDealPage = CreateNewDealPage;
  loginPage = LoginPage;

  onCreateNewDeal() {
    this.benimFirsatimLib.checkAuthFromStorage().then(response => {
      if(response != null){
        this.navCtrl.push(this.createNewDealPage);
      }
      else{
        this.benimFirsatimLib.showAlert("Uyarı", "Fırsat yaratmak için giriş yapmalısınız.", [
          {
            text: 'Giriş Yap', handler: () => {
            this.navCtrl.push(this.loginPage);
          }
          },
          {
            text: 'Vazgeç'
          }])
      }
    }).catch(error => {
        this.benimFirsatimLib.showToast(error.toLocaleString(),3000,'bottom')
    })
  }
}
