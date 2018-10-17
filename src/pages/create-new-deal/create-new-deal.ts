import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Location} from "../../models/location";
import {Category} from "../../models/category";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {onPictureSelectAnimation} from "../../app/animations";
import {OpportunityPage} from "../opportunity/opportunity";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-create-new-deal',
  templateUrl: 'create-new-deal.html',
  animations:[
    onPictureSelectAnimation
  ]
})
export class CreateNewDealPage {

  location:Location = {
    ltt: 39.9334,
    lng: 32.8597
  };
  categories: Category[] = [];
  deal_title : string = '';
  deal_details : string ='';
  images : any[] = [];
  isLinkEmpty: boolean = true;
  selectedImageUrl:string ='';
  selectedImages:any[] = [];
  base64ImageToUpload: string;
  photoTaken = false;
  deal_tags = [];

  cities = [];


  constructor(private benimFirsatimLib:BenimfirsatimLib,
              private loadingCtrl:LoadingController,
              private navCtrl:NavController){
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
    this.fillImagesArrayWithDefaultImages();
  }


  onSubmit(form:NgForm){

    // Warn if user doesnt select any image for deal.
    if(this.selectedImageUrl == ''){
      this.benimFirsatimLib.showToast("Lütfen bir görsel seçiniz",3000,"bottom");
    }else if(parseFloat(form.value.deal_price) > parseFloat(form.value.deal_original_price)){
      this.benimFirsatimLib.showToast("Fırsat fiyatı, normal fiyattan büyük olamaz",3000,"bottom");
    }
    else{
      const loading = this.loadingCtrl.create({
        content: "Fırsat Yaratılıyor"
      })
      loading.present();
      this.benimFirsatimLib.create_deal(form,this.selectedImageUrl,this.base64ImageToUpload).subscribe(response=>{
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


  // it replaces title,images,description of deals with given link.
  onUrlChange(event){
    if(this.isLinkEmpty){

      const loading = this.loadingCtrl.create({
        content : "Yükleniyor..."
      });

      loading.present();
      this.benimFirsatimLib.getPullMeta(event.value).subscribe(response=>{
        if(!response.json().hasOwnProperty("errors")){
          this.images =[];
          this.images.push(response.json().best_image);
          for(var i=0;i<response.json().other_images.length;i++){
            if(this.images.length < 5){
              this.images.push(response.json().other_images[i][0]);
            }
          }
          this.deal_title = response.json().title;
          this.deal_details = response.json().description;
          loading.dismiss();
        }else{
          this.benimFirsatimLib.showToast("Bilgi bulunamadı.",3000,"bottom");
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
  }
  // it fills the array with default images.
  fillImagesArrayWithDefaultImages(){
      for(let i=0;i<4;i++){
        this.images.push('assets/imgs/firsat_gorseli_unselected@3x.png');
    }
  }

  onPictureSelect(picture){


    this.selectedImages.forEach(element=>{
      element.isSelected = false;
    })
    picture.isSelected = !picture.isSelected;
    this.selectedImages.push(picture);
    this.selectedImageUrl = picture.children[0].currentSrc;

  }

  get_today_date_as_string(){
    let date = new Date();
    return date.toJSON().substring(0,10);
  }

}
