import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
  marker: Location;

  constructor(public viewCtrl:ViewController, public navParams: NavParams) {

    this.location = navParams.get('location');
    if(navParams.get('isSet')){
      this.marker = this.location;
    }
  }

  onSetMarker(event:any){
    this.marker = new Location(event.coords.lat,event.coords.lng);
  }

  onAbort(){
      this.viewCtrl.dismiss();
  }

  onConfirm(){
      this.viewCtrl.dismiss({location:this.marker});
  }

}
