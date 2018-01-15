import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Category} from "../../models/category";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {onPictureSelectAnimation} from "../../app/animations";
import {OpportunityPage} from "../opportunity/opportunity";
import {Opportunity} from "../../models/opportunity";
import {Camera,CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";

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
  cities: string[] = [];
  deal_title : string = '';
  deal_details : string ='';
  images : any[] = [];
  isLinkEmpty: boolean = true;
  selectedImageUrl:string ='';
  selectedImages:any[] = [];
  base64Image: string;
  base64ImageToUpload: string;
  photoTaken = false;


  constructor(private modalCtrl:ModalController,
              private benimFirsatimLib:BenimfirsatimLib,
              private loadingCtrl:LoadingController,
              private navCtrl:NavController,
              private camera:Camera,
              private file:File){
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

    // Warn if user doesnt select any image for deal.
    if(this.selectedImageUrl == ''){
      this.benimFirsatimLib.showToast("Lütfen bir görsel seçiniz",3000,"bottom");
    }
    else{
      this.benimFirsatimLib.createDeal(form,this.selectedImageUrl,this.base64ImageToUpload).subscribe(response=>{
        console.log(response);
        console.log(response.json());
        if(response.ok){
            const loading = this.loadingCtrl.create({
              content: "Fırsat Yaratılıyor"
            })
            loading.present();

            let u:Opportunity = new Opportunity();
            Object.assign(u,response.json());
            this.navCtrl.push(OpportunityPage,u);


          loading.dismiss();
        }
        else{
          this.benimFirsatimLib.showToast(response.statusText,3000,'bottom');
        }
      },error=>{
        this.benimFirsatimLib.showToast(error.toLocaleString(),3000,'bottom')})
    }
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
    console.log(this.isLinkEmpty);
  }
  // it fills the array with default images.
  fillImagesArrayWithDefaultImages(){
      for(let i=0;i<4;i++){
        this.images.push('https://benimfirsatim.com/product_placeholder.png');
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

  onTakePhoto(){

    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.photoTaken = true;
      this.selectedImageUrl = 'photoTaken';
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      let base64 = this.base64Image.split(',');
      this.base64ImageToUpload=base64[1].trim();

    }, (err) => {
      console.log(err);
      this.selectedImageUrl = '';
      this.photoTaken = false;
    });
  }

}
