import {Component} from "@angular/core";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NavController} from "ionic-angular";
import {CreateNewDealPage} from "../../pages/create-new-deal/create-new-deal";
import {LoginPage} from "../../pages/login/login";

@Component({
  selector:'fab',
  template:`
    <ion-fab bottom center>
      <button ion-fab
              (click)="onCreateNewDeal()">
       
      </button>
    </ion-fab>
  `
})
export class FabCompenent{

  createNewDealPage = CreateNewDealPage;
  loginPage = LoginPage;

  constructor(private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController){

  }

}
