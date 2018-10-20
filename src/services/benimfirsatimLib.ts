import {Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import {ActionSheetController, AlertController, ToastController} from "ionic-angular";
import {Headers} from '@angular/http';
import {NgForm} from "@angular/forms";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
declare const FB:any;

@Injectable()
export class BenimfirsatimLib{

  //api_address = "https://benimfirsatim.com";
  api_address = "http://localhost:3000";
  token:string ="";
  static user:any;
  static showAd = 0;


  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private actionSheetCtrl:ActionSheetController,
              private fb: Facebook
              ){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public get_page(page_code,pagination){
      return this.http.get(this.api_address + '/deals'+page_code+'.json?page='+pagination);
  }


  public signUp(email,password, name) {
    return this.http.post(this.api_address + '/users.json', {
      user: {
        email: email,
        password: password,
        password_confirmation: password,
        name: name
      }
    })
  }

  public check_auth():Promise<boolean> {
    return new Promise( resolve => {
      let bf_auth_obj = JSON.parse(localStorage.getItem("bf-auth"));
      if(bf_auth_obj === null){
        resolve(false);
      }else{
        this.token = bf_auth_obj.token;
        BenimfirsatimLib.user = bf_auth_obj;
        let opt = this.setHeader();
        this.http.get(this.api_address + '/token/check_validation', opt).subscribe(data => {
          try{
            if(data.json().status == 'ok'){
              resolve(true);
            }
          }catch (e){
            resolve(false);
          }
        });
      }
    })

  }

  /*public signupOrLogin(email,name,avatar_url,uid,authResponse,provider_name){
    return this.http.post(this.api_address+'/users/auto_oauth',{"email":email,"name":name,"avatar_url":avatar_url,"uid":uid,"provider":provider_name,login_data:authResponse});
  }*/

  public facebook_login(){
    FB.login( response =>{
      this.http.post(this.api_address + '/users/auth/facebook/callback.json', {'accessToken':response.authResponse.accessToken}).subscribe( auth_response => {
        console.log(auth_response)
      })
    })

  }
  public google_login(){
    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Access-Control-Allow-Origin','*');

    opt = new RequestOptions({
      headers:myHeaders
    });

    return this.http.get(this.api_address + '/users/auth/google_oauth2',opt)
  }
  public signIn(email,password){
    return this.http.post(this.api_address + '/users/sign_in.json',{
      user: {
        email: email,
        password: password
      }
    })
  }

  public destroy_session(){
    let opt = this.setHeader();
    return this.http.delete(this.api_address + '/users/sign_out.json', opt )
  }
  public getDeal(deal_id){
    return this.http.get( 'deals/0/'+deal_id.toString() + '/');
  }

  public updateUser(nickname,password){
    return this.http.put('users.json',{"name":nickname,"password":password});
  }

  public upvoteDeal(deal_id){
    let opt= this.setHeader();
    return this.http.get(this.api_address+'/deals/'+deal_id.toString() + '/upvote.json',opt);
  }
/*
  public downvoteDeal(deal_id){
    let opt= this.setHeader();
    return this.http.get( this.api_address+'/deals/'+deal_id.toString() + '/downvote.json',opt);
  }*/

  public createComment(deal_id,parent_comment_id,comment){
    let opt = this.setHeader()
    return this.http.post( this.api_address+'/deals/' + deal_id +'/comments.json',{parent_comment_id:parent_comment_id,comment:comment},opt);
  }

  public create_deal(form:NgForm,selectedImageUrl,imageBase64){
    let body;
    let tags = "";
    let tags_array = form.value.deal_tags;
    if(tags_array.length > 0){
      for(let i=0;i<tags_array.length;i++){
        tags += tags_array[i] + ",";
      }
      tags.substring(0, tags.length-1);
    }
    if(selectedImageUrl == 'photoTaken'){

      body = {

        deal:{
          "starts_at":form.value.starts_at,
          "finished_at":form.value.finished_at,
          "price":form.value.deal_price,
          "original_price": form.value.deal_original_price,
          "category": form.value.selectedCategory,
          "link":form.value.vendor,
          "image":imageBase64,
          "title":form.value.deal_title,
          "details":form.value.deal_details,
          "coupon_code":form.value.deal_coupon_code,
          "city":form.value.selectedCity,
          "tags": tags
        }
      };
    }
    else{
      body = {

        deal:{
          "starts_at":form.value.starts_at,
          "finished_at":form.value.finished_at,
          "price":form.value.deal_price,
          "original_price": form.value.deal_original_price,
          "category": form.value.selectedCategory,
          "link":form.value.deal_url,
          "image_url":selectedImageUrl,
          "title":form.value.deal_title,
          "details":form.value.deal_details,
          "coupon_code":form.value.deal_coupon_code,
          "city":form.value.selectedCity,
          "tags": tags
        }
      };
    }

    let opt = this.setHeader();
    return this.http.post(this.api_address + '/deals.json',body,opt);
  }

  public commentVote(comment_id){
    let opt = this.setHeader();
    return this.http.get(this.api_address+'/comments/'+comment_id+'/upvote.json', opt);
  }
  public getComments(deal_id,page){
    return this.http.get(this.api_address + '/deals/'+deal_id+'/comments.json?page='+page);
  }

  public getCities(){
    return this.http.get(this.api_address+'/cities');
  }
  public getCategories(){
    return this.http.get(this.api_address+ '/categories.json');
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
    return this.http.get(this.api_address+ '/categories/'+categoryIndex+'/deals.json?page='+pagination+'&per_page=3');
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
    localStorage.setItem(key,JSON.stringify(value));
  }

  //It removes all of users from device local storage.
  public logOutFromStorageAndAuth(){
    localStorage.removeItem("bf-auth");
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Authorization', this.token);

    opt = new RequestOptions({
      headers:myHeaders
    });

    return opt;
  }
  // sets user object to user static variable which locates in this class after login.
  public setUserInfoAfterLogin(data){

    BenimfirsatimLib.user = data;
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
    return this.http.get(  'user/logs');
  }


  //Gets deals which created by current logged user.
  public getDealFromUser(pagination){
    return this.http.get('user/'+BenimfirsatimLib.user.id+'/deals.json?page='+pagination+'&per_page=3');
  }


  public getUsersTop(){
    return this.http.get(this.api_address + '/users/top');
  }
  public stockFinished(dealId){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/deals/'+dealId+'/finished',opt);
  }

  public ended(dealId){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/deals/'+dealId+'/ended',opt);
  }

  public report(dealId){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/deals/'+dealId+'/report',opt);
  }
}

