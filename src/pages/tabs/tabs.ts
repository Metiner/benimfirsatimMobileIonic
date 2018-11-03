import { Component } from '@angular/core';
import {HighlightsPage} from "../highlights/highlights";
import {RisingPage} from "../rising/rising";
import {TopPage} from "../top/top";
import { NavController} from "ionic-angular";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {CategoriesPage} from "../categories/categories";
import {LoginPage} from "../login/login";
import {SelectShareTypePage} from "../select-share-type/select-share-type";
import {MyApp} from "../../app/app.component";
@Component({
  selector: 'page-tabs',
  template: `

    
    <ion-tabs tabsPlacement ="bottom" [selectedIndex]="2">
      <ion-footer>
        <ion-buttons>
          <button 
                  class="deal-creation-selection-button"
                  ion-button
                  clear
                  (click)="onCreateNewDeal()"><img src="assets/imgs/yeni_firsat_button@2x.png"></button>
        </ion-buttons>         
      </ion-footer>
      <ion-tab  [tabsHideOnSubPages]="true" [root]="highlightsPage" tabIcon="benimFirsatim-oneCikanlar" tabTitle= "ÖNE ÇIKANLAR">
      </ion-tab>
      <ion-tab   style="font-family: MarkPro-Book !important;font-size: 10px !important;"[tabsHideOnSubPages]="true" [root]="topPage" tabIcon="benimFirsatim-yeniler" tabTitle="YENİLER" >
      </ion-tab>
      <ion-tab style="margin-right: 100px" [tabsHideOnSubPages]="true" [root]="risingPage" tabIcon="benimFirsatim-yukselenler" tabTitle="YÜKSELENLER" >
      </ion-tab>
      <ion-tab [tabsHideOnSubPages]="true" [root]="categoriesPage" tabIcon="benimFirsatim-kategoriler" tabTitle="KATEGORİLER" >
      </ion-tab>

    </ion-tabs>
  `,
})
export class TabsPage {
  constructor(private navCtrl: NavController,
              private benimFirsatimLib: BenimfirsatimLib) {
  }

  highlightsPage = 'HighlightsPage';
  risingPage = 'RisingPage';
  topPage = 'TopPage';
  categoriesPage = 'CategoriesPage';
  loginPage = 'LoginPage';

  onCreateNewDeal() {

    if(MyApp.isAuthenticated){
      this.navCtrl.push(SelectShareTypePage);
    }else{
      this.benimFirsatimLib.showAlert("Uyarı", "Fırsat yaratmak için giriş yapmalısınız.", [
        {
          text: 'Giriş Yap', handler: () => {
          this.navCtrl.setRoot(this.loginPage);
        }
        },
        {
          text: 'Vazgeç'
        }
      ])
    }
  }

}
