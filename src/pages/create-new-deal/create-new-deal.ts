import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, Platform} from 'ionic-angular';
import {NgForm} from "@angular/forms";
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

  states = ['Tüm Türkiye','Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
    'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
    'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
    'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
    'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'];


  constructor(private modalCtrl:ModalController,
              private benimFirsatimLib:BenimfirsatimLib,
              private loadingCtrl:LoadingController,
              private navCtrl:NavController,
              private camera:Camera,
              private file:File,
              private platform:Platform){
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

    form.value.selectedCategory = this.getCategoryId(form.value.selectedCategory);
    // Warn if user doesnt select any image for deal.
    if(this.selectedImageUrl == ''){
      this.benimFirsatimLib.showToast("Lütfen bir görsel seçiniz",3000,"bottom");
    }
    else{
      const loading = this.loadingCtrl.create({
        content: "Fırsat Yaratılıyor"
      })
      loading.present();
      this.benimFirsatimLib.createDeal(form,this.selectedImageUrl,this.base64ImageToUpload).subscribe(response=>{
        if(response.ok){


            let u:Opportunity = new Opportunity();
            Object.assign(u,response.json());
            u.newlyCreated = true;
            this.navCtrl.push(OpportunityPage,u);


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

  /*onOpenMap(){

    const modal = this.modalCtrl.create(SetLocationPage,{location:this.location,
                                                              isSet:this.isLocationSet});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data){
        this.location = data.location;
        this.isLocationSet = true;
      }
    })
  }*/
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

  /*onTakePhoto(){

    if(this.platform.is('cordova')){
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
    else{
      this.benimFirsatimLib.showToast("Bu özellik sadece uygulamalarımızda var :(",3000,'bottom');

    }

  }*/
  getCategoryId(name) {

    switch (name) {
      case 'OFİS & KIRTASİYE':
        return 15;
      case 'MÜZİK':
        return 14;
      case 'OTOMOBİL AKSESUARLARI':
        return 16;
      case 'SAĞLIK & KİŞİSEL BAKIM':
        return 17;
      case 'SPOR & FITNESS':
        return 18;
      case 'TATİL & KAMPÇILIK':
        return 20;
      case 'YAZILIM & OYUN':
        return 21;
      case 'TAKI & AKSESUAR':
        return 19;
      case 'DİĞER':
        return 22;
      case 'AİLE & ÇOCUK':
        return 1;
      case 'BEYAZ EŞYA & EV ALETLERİ':
        return 2;
      case 'BİLGİSAYAR':
        return 3;
      case 'EV & BAHÇE':
        return 8;
      case 'FREEBIES':
        return 10;
      case 'FİNANSAL HİZMETLER':
        return 9;
      case 'GIDA':
        return 11;
      case 'MOBİLYA':
        return 12;
      case 'MODA & TEKSTİL':
        return 13;
      case 'ELEKTRONİK':
        return 7;
      case 'EĞLENCE':
        return 6;
      case 'ÇİN FIRSATLARI':
        return 5;
      case 'CEP TELEFONU':
        return 4;
    }

    return 0;
  }
}
