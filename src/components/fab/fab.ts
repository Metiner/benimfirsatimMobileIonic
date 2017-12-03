import {Component} from "@angular/core";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NavController} from "ionic-angular";
import {CreateNewDealPage} from "../../pages/create-new-deal/create-new-deal";
import {LoginPage} from "../../pages/login/login";

@Component({
  selector:'fab',
  template:`<ion-fab  right top style="top:80px;position: fixed">
    <button ion-fab style="background-color: #0572B2"
            (click)="onCreateNewDeal()">
      <ion-icon name="add"></ion-icon>
    </button>
  </ion-fab>`
})
export class FabCompenent{

  createNewDealPage = CreateNewDealPage;
  loginPage = LoginPage;

  constructor(private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController){

  }
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
