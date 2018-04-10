import {Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import {ActionSheetController, AlertController, ToastController} from "ionic-angular";
import { Storage} from "@ionic/storage";
import {Headers} from '@angular/http';
import {User} from "../models/user";
import {NgForm} from "@angular/forms";

@Injectable()
export class BenimfirsatimLib{
  //api_address = "https://benimfirsatim.com";
  //api_address = "http://192.168.0.40:3000";

  //api_address = "https://benimfirsatim-gkaykck.c9users.io:8080";

  api_address = "https://app-b7b3c182-2419-47ad-a597-caf24ce3f70c.cleverapps.io";
  static token:string ="";
  static user:User = new User;
  static isLoggedInWithFacebook = false;
  static isLoggedInWihGoogle = false;


  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private storageCtrl:Storage,
              private actionSheetCtrl:ActionSheetController
              ){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code,pagination){
      //let opt = this.setHeader();
      let possible_page_codes = ['hot','rising','newcomers'];
      /*if(possible_page_codes.indexOf(page_code)=== -1){
        return;

      }*/
      return this.http.get(this.api_address + '/'+page_code+'.json?page='+pagination+'&per_page=3');
  }


  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users', {"user":{"email":email,"password":password}});
  }

  public checkLogin(){
    let opt = this.setHeader();
    console.log(opt);
    return this.http.get(this.api_address + '/users/login_check',opt);
  }

  public signupOrLogin(email,name,avatar_url,uid,authResponse,provider_name){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/users/auto_oauth',{"email":email,"name":name,"avatar_url":avatar_url,"uid":uid,"provider":provider_name,login_data:authResponse},opt);
  }

  public signIn(email,password){
    console.log(email,password);
    return this.http.post(this.api_address + '/users/sign_in.json',{"user":{"email":email,"password":password}});
  }

  public getDeal(deal_id){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/0/'+deal_id.toString() + '/',opt);
  }

  public updateUser(nickname,password){
    let opt = this.setHeader();
    console.log(opt);
    return this.http.put(this.api_address + '/users.json',{"name":nickname,"password":password},opt);
  }

  public upvoteDeal(deal_id){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/'+deal_id.toString() + '/upvote',opt);
  }

  public downvoteDeal(deal_id){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/'+deal_id.toString() + '/downvote',opt);
  }

  public createComment(deal_id,parent_comment_id,comment){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/deals/' + deal_id +'/comments.json',{parent_comment_id:parent_comment_id,comment:comment},opt);
  }

  public createDeal(form:NgForm,selectedImageUrl,imageBase64){
    let opt = this.setHeader();
    let categories = '';
    let body;
console.log(form.value);
    if(selectedImageUrl == 'photoTaken'){
      body = {starts_at:form.value.deal_date,
        price:form.value.deal_price,
        categories: form.value.selectedCategory[0],
        image_64:imageBase64,
        link:form.value.deal_url,
        title:form.value.deal_title,
        details:form.value.deal_details,
        coupon_code:form.value.deal_coupon_code,
        city:form.value.selectedCity};
    }
    else{
      body = {starts_at:form.value.deal_date,
        price:form.value.deal_price,
        categories: form.value.selectedCategory[0],
        link:form.value.deal_url,
        image_url:selectedImageUrl,
        title:form.value.deal_title,
        details:form.value.deal_details,
        coupon_code:form.value.deal_coupon_code,
        city:form.value.selectedCity};
    }

    return this.http.post(this.api_address + '/deals/create.json',body,opt);
  }

  public commentVote(comment_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/comments/'+comment_id+'/vote',{},opt);
  }
  public getComments(deal_id,page){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/'+deal_id+'/comments?page='+page+'&per_page=3',opt);
  }

  public getCities(){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/data/cities',opt);
  }
  public getCategories(){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/categories',opt);
  }

  //Gets information from given deal link.
  public getPullMeta(url){
    return this.http.get(this.api_address + '/deals/pull_meta?target=' + url);
  }

  public showAlert(title:string,subTitle:string,buttons:any[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  public getCategoryDeals(categoryIndex,pagination){
    let opt = this.setHeader();
    return this.http.get(this.api_address+'/categories/'+categoryIndex+'/deals.json?page='+pagination+'&per_page=3',opt);
  }

  public showToast(message: string,duration:number,position:string){

    const toast = this.toastCtrl.create({
      message : message,
      duration : duration,
      position : position
    })
   toast.present();
  }

  // Function for setting key and value on devices storage.
  public storageControl(key:string,value:string){
    this.storageCtrl.set(key,value)
      .then( success =>{
        this.setTokenFromStorage();
        return success;
        }
      )
      .catch(
        err => {
          this.showToast(err,3000,"bottom");
        }
      );

  }

  //It checks if any user is stored on devices local storage.
  public checkAuthFromStorage() {
      return this.storageCtrl.get("user")
  }

  //It removes all of users from device local storage.
  public logOutFromStorageAndAuth(){
    this.storageCtrl.clear().then(
      data => {
        return true;
      }
    ).catch(err =>{
      this.showToast(err,3000,"bottom");
      return false;
    })
  }

// sets token to static variable named token in this class after login.
  public setTokenFromStorage():string{
    this.storageCtrl.get("user").then(data=>{
      BenimfirsatimLib.token= data.token;
      return BenimfirsatimLib.token;
      }
    ).catch(err=> {
     this.showToast(err,300,"bottom");
    })
    return '';
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Authorization',BenimfirsatimLib.token);

    opt = new RequestOptions({
      headers:myHeaders
    });

    return opt;
  }
  // sets user object to user static variable which locates in this class after login.
  public setUserInfoAfterLogin(user:any){
    let u:User=new User();
    Object.assign(u,user);
    BenimfirsatimLib.user = u;
  }

  // displays a action sheet with given parameters
    presentActionSheet(title:string,buttons:any[]) {
      let actionSheet = this.actionSheetCtrl.create({
        title: title,
        buttons: buttons
      });
      actionSheet.present();
  }

  //Get user logs, notifications.
  public getUserLog(){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/user/logs', opt);
  }


  //Gets deals which created by current logged user.
  public getDealFromUser(pagination){
    let opt = this.setHeader();
    return this.http.get(this.api_address+'/user/'+BenimfirsatimLib.user.id+'/deals.json?page='+pagination+'&per_page=3',opt);
  }


}

