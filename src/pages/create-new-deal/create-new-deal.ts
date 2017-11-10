import { Component } from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-create-new-deal',
  templateUrl: 'create-new-deal.html',
})
export class CreateNewDealPage {

  location:Location = {
    ltt: 39.9334,
    lng: 32.8597
  };

  constructor(private modalCtrl:ModalController){}

  isLocationSet = false;

  onSubmit(form:NgForm){
    console.log(form.value);
  }

  onOpenMap(){

    const modal = this.modalCtrl.create(SetLocationPage,{location:this.location,
                                                              isSet:this.isLocationSet});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.location = data.location;
        this.isLocationSet = true;
      }
    })

  }
}
