import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Category} from "../../models/category";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

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
  categories: Category[] = [];
  cities: string[] = [];
  deal_title : string = '';
  deal_details : string ='';
  images : any[] = [];
  isLinkEmpty: boolean = true;

  constructor(private modalCtrl:ModalController,
              private benimFirsatimLib:BenimfirsatimLib,
              private loadingCtrl:LoadingController){
    benimFirsatimLib.getCategories().subscribe(data=>{
      data.json().forEach(element=>{
        let u: Category = new Category();
        Object.assign(u,element);
        this.categories.push(u);
      })
    })
    this.benimFirsatimLib.getCities().subscribe(response=>{
      this.cities = response.json();
    },error2 => {
      console.log(error2.toLocaleString());
    })
    this.fillImagesArrayWithDefaultImages();
  }

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
  // it replaces title,images,description of deals with given link.
  onUrlChange(event){
    if(this.isLinkEmpty){
      this.benimFirsatimLib.getPullMeta(event.value).subscribe(response=>{
        if(!response.json().hasOwnProperty("errors")){
          const loading = this.loadingCtrl.create({
            content : "Yükleniyor..."
          });
          loading.present();
          this.images =[];
          this.images.push(response.json().best_image);
          this.images.push(response.json().other_images[2][0]);
          this.images.push(response.json().other_images[3][0]);
          this.images.push(response.json().other_images[4][0]);
          this.deal_title = response.json().title;
          this.deal_details = response.json().description;
          loading.dismiss();
        }
      },error2 => {
        console.log(error2.toLocaleString());
      })
    }
    if(event.value == ''){
      this.isLinkEmpty = true;
    }else
    {
      this.isLinkEmpty = false;
    }
    console.log(this.isLinkEmpty);
  }
  // it fills the array with default images.
  fillImagesArrayWithDefaultImages(){
      for(let i=0;i<4;i++){
        this.images.push('https://benimfirsatim.com/product_placeholder.png');
    }
  }
}
