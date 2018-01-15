import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import {NavController} from "ionic-angular";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {CategoriesPage} from "../categories/categories";
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";
import {LoginPage} from "../login/login";
@Component({
  selector: 'page-tabs',
  template: `

    
    <ion-tabs tabsPlacement ="bottom">
      <button ion-button 
              clear
              (click)="onCreateNewDeal()"
              style="position: fixed;bottom:1px;z-index: 99;width: 110px;height: 110px;left: 50%;margin-left: -48px"><img src="assets/imgs/yeni_firsat_button@2x.png"></button>

      <ion-tab  [tabsHideOnSubPages]="true" [root]="highlightsPage" tabIcon="flash" tabTitle= "Öne Çıkanlar">
        <ion-icon name="flash"></ion-icon>
      </ion-tab>
      <ion-tab style="margin-right: 100px" [tabsHideOnSubPages]="true" [root]="risingPage" tabIcon="arrow-dropup-circle" tabTitle="Yükselenler" ></ion-tab>
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
