import {Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'
import {AlertController, ToastController} from "ionic-angular";
import { Storage} from "@ionic/storage";
import {Headers} from '@angular/http';


@Injectable()
export class BenimfirsatimLib{
  api_address = "https://benimfirsatim.com";
  token:string ="";

  constructor(private http:Http,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private storageCtrl:Storage){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code){
      let opt = this.setHeader();
      let possible_page_codes = ['hot','rising','newcomers'];
      if(possible_page_codes.indexOf(page_code)=== -1){
        return;

      }
      return this.http.get(this.api_address + '/'+page_code+'.json',opt);
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

  public createComment(deal_id,parent_comment_id){
    let opt = this.setHeader();
    return this.http.post(this.api_address + '/deals/' + deal_id +'/comments.json',{parent_comment_id:parent_comment_id},opt);
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
  public showAlert(title:string,subTitle:string,buttons:string[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
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
        this.getTokenFromStorage();
        return success;
        }
      )
      .catch(
        err => {
          this.showToast(err,3000,"bottom");
        }
      );

  }

  //It checks if any email is stored on devices local storage.
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

  //It removes all of mails from device local storage.
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


  public getTokenFromStorage():string{
    this.storageCtrl.get("user").then(data=>{
      this.token = data.token;
      return this.token;
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

    myHeaders.set('Authorization',this.token);

    opt = new RequestOptions({
      headers:myHeaders
    });

    return opt;
  }

}

