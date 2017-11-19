import {Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import {ActionSheetController, AlertController, ToastController} from "ionic-angular";
import { Storage} from "@ionic/storage";
import {Headers} from '@angular/http';
import {User} from "../models/user";
import {GoogleAnalytics} from "@ionic-native/google-analytics";


@Injectable()
export class BenimfirsatimLib{
  api_address = "https://benimfirsatim.com";
  static token:string ="";
  static user:User = new User;


  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private storageCtrl:Storage,
              private actionSheetCtrl:ActionSheetController
              ){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code,pagination){
      let opt = this.setHeader();
      let possible_page_codes = ['hot','rising','newcomers'];
      if(possible_page_codes.indexOf(page_code)=== -1){
        return;

      }
      return this.http.get(this.api_address + '/'+page_code+'.json?page='+pagination+'&per_page=3',opt);
  }


  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users.json',{"user":{"email":email,"password":password}});
  }

  public checkLogin(){
    let opt = this.setHeader();
    console.log(opt);
    return this.http.get(this.api_address + '/users/login_check',opt);
  }

  public signupOrLogin(email,name,avatar_url,uid,provider_name){
    let opt = this.setHeader();
    return this.http.post(this.api_address+'/users/auto_oauth',{"email":email,"name":name,"avatar_url":avatar_url,"uid":uid,"provider":provider_name},opt);
  }

  public signIn(email,password){
    return this.http.post(this.api_address + '/users/sign_in.json',{"user":{"email":email,"password":password}});
  }

  public getDeal(deal_id){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/0/'+deal_id.toString() + '/',opt);
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

  public commentVote(comment_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/comments/'+comment_id+'/vote',{},opt);
  }
  public getComments(deal_id,page){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/deals/'+deal_id+'/comments?page='+page+'&per_page=3',opt);
  }

  public getCategories(){
    let opt = this.setHeader();
    return this.http.get(this.api_address + '/categories',opt);
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
  public checkAuthFromStorage(){
    this.storageCtrl.get("user").then(
      data =>{
        if(data != null && data != undefined){
          return true;
        }else{
          return false;
        }
      }
    )
      .catch(err=>{
        this.showToast(err,3000,"bottom");
      });

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
}

