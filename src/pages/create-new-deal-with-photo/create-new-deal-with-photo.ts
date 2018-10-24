import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {Location} from "../../models/location";
import {Geolocation} from "ionic-native";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Category} from "../../models/category";
import {NgForm} from "@angular/forms";
import {OpportunityPage} from "../opportunity/opportunity";



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
  base64ImageToUpload: string = '';
  location:any = {};
  deal_tags = [];

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
  onSubmit(form:NgForm){

    // Warn if user doesnt select any image for deal.
    if(this.base64ImageToUpload == ''){
      this.benimFirsatimLib.showToast("FOTOĞRAF ÇEKMEYİ UNUTTUN!",3000,"bottom");
    }else if(parseFloat(form.value.deal_price) > parseFloat(form.value.deal_original_price)){
      this.benimFirsatimLib.showToast("Fırsat fiyatı, normal fiyattan büyük olamaz",3000,"bottom");
    }
    else{
      const loading = this.loadingCtrl.create({
        content: "Fırsat Yaratılıyor"
      })
      loading.present();
      if(this.location.ltt !== undefined){
        form.value.lat = this.location.ltt;
        form.value.lng = this.location.lng;
      }
      this.benimFirsatimLib.create_deal(form,"photoTaken",this.base64ImageToUpload).subscribe(response=>{
        if(response.ok){
          this.navCtrl.popToRoot();
          this.navCtrl.push(OpportunityPage,response.json());
          loading.dismiss();
        }
        else{
          this.benimFirsatimLib.showToast(response.statusText,3000,'bottom');

          loading.dismiss();
        }
      },error=>{
        this.benimFirsatimLib.showToast(error.toLocaleString(),3000,'bottom')})

      loading.dismiss();
    }
  }

  get_today_date_as_string(){
    let date = new Date();
    return date.toJSON().substring(0,10);
  }

}
