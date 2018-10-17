import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {Location} from "../../models/location";
import {Geolocation} from "ionic-native";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Category} from "../../models/category";



/**
 * Generated class for the CreateNewDealWithPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-new-deal-with-photo',
  templateUrl: 'create-new-deal-with-photo.html',
})
export class CreateNewDealWithPhotoPage {

  cities = [];
  categories: Category[] = [];


  base64Image: string;
  base64ImageToUpload: string;
  location:Location = {
    ltt: 39.9334,
    lng: 32.8597
  };
  isLocationSet = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera:Camera,
              private loadingCtrl: LoadingController,
              private benimFirsatimLib: BenimfirsatimLib
  ){
    benimFirsatimLib.getCategories().subscribe(data=>{
      data.json().forEach(element=>{
        let u: Category = new Category();
        Object.assign(u,element);
        this.categories.push(u);
      })
    })
    this.benimFirsatimLib.getCities().subscribe(response=>{
      this.cities = response.json().cities;
    },error2 => {
      console.log(error2.toLocaleString());
    })
  }

  ionViewDidLoad() {
    this.isLocationSet = false;

  }
  onTakePhoto(){

      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
      }).then((imageData) => {
        // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        let base64 = this.base64Image.split(',');
        this.base64ImageToUpload=base64[1].trim();

      }, (err) => {
        console.log(err);
      });
    }
  onOpenMap(){

    if(!this.isLocationSet){
      let loading = this.loadingCtrl.create();
      loading.present();
      Geolocation.getCurrentPosition().then((resp) => {
        this.location.ltt = resp.coords.latitude;
        this.location.lng = resp.coords.longitude;
        this.isLocationSet = true;
        loading.dismiss();

      }).catch((error) => {
        console.log('Error getting location', error);
        loading.dismiss();

      });
    }

  }

}
