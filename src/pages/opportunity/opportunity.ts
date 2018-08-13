import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NgForm} from "@angular/forms";
import {onCommentExpand, onItemBump} from "../../app/animations";
import {LoginPage} from "../login/login";
import {BrowserTab} from "@ionic-native/browser-tab";
import {OnCommentReplyPage} from "../on-comment-reply/on-comment-reply";
import * as $ from 'jquery'

import * as lottie from 'lottie-web';

declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
  animations:[
    onItemBump,
    onCommentExpand
]
})
export class OpportunityPage {

  opportunity: Opportunity;
  comments: Comment[] = [];
  loginPage = LoginPage;
  onCommentReplyPage = OnCommentReplyPage;
  commentLikeIndex = 0;

  thumbUpAnimations=[];

  dealReported = false;


  likeButtonAnimation:any;
  likeCommentButton:any;
  comment = "ne düşünüyorsun";

  static pageCount = 1;
  @ViewChild(Content) content:Content;

  itemone=true;
  itemtwo=true;
  itemthree=true;
  itemfour=true;

  newlyAddedComments = [];

  constructor(public navParams: NavParams,
              private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController,
              private browserTab:BrowserTab,
              public actionSheetCtrl: ActionSheetController) {
    this.loadAnimations();
    OpportunityPage.pageCount = 1;
    this.opportunity = navParams.data;

    benimFirsatimLib.getComments(this.opportunity.id,1).subscribe(data =>{
      OpportunityPage.pageCount++;
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
        u.showUntil = 2;
        u.dahaFazlaGetirText = 'DAHA FAZLA GETİR';
        this.comments.push(u);
      })

      this.loadThumbsupAnimations();
    });

    this.setItemsBooleanOpposite()
  }

  upVoteDeal(dealId:number){

    /*this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });*/
  }

  downVoteDeal(dealId:number){
/*
    this.benimFirsatimLib.downvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });*/
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

      this.benimFirsatimLib.getComments(this.opportunity.id,OpportunityPage.pageCount).subscribe(data =>{


        if(data.json().length > 0) {
          OpportunityPage.pageCount++;
          data.json().forEach(element => {
            let u: Comment = new Comment();
            Object.assign(u, element);
            u.showUntil = 2;
            u.dahaFazlaGetirText = 'DAHA FAZLA GETİR';
            this.comments.push(u);
          })
          this.loadThumbsupAnimations();
        }else
        {
          infiniteScroll.enable(false);
          OpportunityPage.pageCount = 1;
        }

        console.log(data)
        infiniteScroll.complete();
      });

  }
  isPriceToolong(){
    return this.opportunity.price ? (this.opportunity.price.length > 5 ? '17px' : this.opportunity.price.length > 6 ? '15px' : '19px') : '22px';
  }
  whatIsPrice(){
    if(this.opportunity.price.indexOf(".0") === -1){
      return this.opportunity.price ? (this.opportunity.price + '₺') : '';
    }else{
      return this.opportunity.price ? (this.opportunity.price.slice(0,this.opportunity.price.indexOf(".")) + '₺') : '';
    }
  }


  onCommentSubmit(form:NgForm){


    let response = this.benimFirsatimLib.checkAuthFromStorage();
      if(response != null){

        let newlyAdded:Comment = new Comment();
        newlyAdded.user = BenimfirsatimLib.user;
        newlyAdded.text = form.value.comment;
        newlyAdded.created_at = (new Date()).toString().split(' ').splice(1,3).join(' ');
        newlyAdded.deal_id = this.opportunity.id;
        newlyAdded.user_id = BenimfirsatimLib.user.id;
        newlyAdded.comment_votes_count = 0;
        this.benimFirsatimLib.createComment(this.opportunity.id,null,form.value.comment).subscribe(data=>{
          this.newlyAddedComments.push(newlyAdded);
          this.scrollToNewlyAddedComment();
        },error2 =>{
          console.log(error2);
        });
        form.resetForm();
      }
      else{
        this.benimFirsatimLib.showAlert("Uyarı", "Yorum yapmak için giriş yapmalısınız.", [
          {
            text: 'Giriş Yap', handler: () => {
            this.navCtrl.push(this.loginPage);
          }
          },
          {
            text: 'Vazgeç'
          }])
      }
  }



  scrollToNewlyAddedComment(){


    this.content.scrollTo(0,400,1000);
    // setTimeout(()=>{
    //   this.loadSingleThumbsupAnimation();
    // },300)

  }

  onOutsideDealLink(opportunity){

    this.setItemsBooleanOpposite();

    setTimeout(()=>{

      this.browserTab.isAvailable()
        .then((isAvailable: boolean) => {

          if (isAvailable) {

            this.browserTab.openUrl(opportunity.link);

          } else {

            // open URL with InAppBrowser instead or SafariViewController

          }

        }).catch(error=>{
        window.open(opportunity.link,'_blank');
      });

    },700)
  }

  setItemsBooleanOpposite() {

    setTimeout(() => {
      this.itemone = !this.itemone;
    }, 0)
    setTimeout(() => {
      this.itemtwo = !this.itemtwo;
    }, 100)
    setTimeout(() => {
      this.itemthree = !this.itemthree;
    }, 200)
    setTimeout(() => {
      this.itemfour = !this.itemfour;
    }, 300)
  }

  goBack(){

    if(this.navParams.data.newlyCreated){
      console.log("poped to root")
      this.navCtrl.popToRoot();
    }else{
      this.navCtrl.pop();
    }
  }

  onCommentReply(commentInfo){
    this.navCtrl.push(this.onCommentReplyPage,commentInfo);
  }

  playAnim(index,type,comment) {
    /*if(type === 'like'){
      this.likeButtonAnimation.play();
      if(this.likeButtonAnimation.liked){
        this.downVoteDeal(this.opportunity.id);
        this.likeButtonAnimation.setDirection(-1);
        this.likeButtonAnimation.liked = false;

      }else{
        this.upVoteDeal(this.opportunity.id);
        this.likeButtonAnimation.setDirection(1);
        this.likeButtonAnimation.liked = true;
      }
    }else if(type === 'thumbsUp'){

      this.thumbUpAnimations[index].play();
      this.benimFirsatimLib.commentVote(comment.id).subscribe(response =>{
        comment.comment_votes_count = response.json().vote_count;
      })
      if(this.thumbUpAnimations[index].liked){
        this.thumbUpAnimations[index].setDirection(-1);
        this.thumbUpAnimations[index].liked = false;
      }else{
        this.thumbUpAnimations[index].setDirection(1);
        this.thumbUpAnimations[index].liked = true;
      }
    }
*/
  }

  loadAnimations(){
    $(document).ready(()=>{
      this.likeButtonAnimation = lottie.loadAnimation({
        container: document.getElementById("lottieLikeButton"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/like_button.json' // the path to the animation json
      });
      this.likeCommentButton = lottie.loadAnimation({
        container: document.getElementById("lottieCommentButton"), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/comment_button.json' // the path to the animation json
      });
    })
  }
  loadThumbsupAnimations(){
    $(document).ready(()=>{
      let animations = document.getElementsByClassName("lottieThumbUpButton");
      if(animations.length > 0)
      {
        for(var i=this.commentLikeIndex;i<animations.length;i++){
          this.thumbUpAnimations.push(
            lottie.loadAnimation({
              container:animations[i],
              renderer:'svg',
              autoplay: false,
              loop:false,
              path:'assets/animations/thumb_up.json'
            })
          )
          this.commentLikeIndex += 1;
        }
      }
    })
  }
  loadSingleThumbsupAnimation(){
    $(document).ready(()=>{
      let animations = document.getElementsByClassName("lottieThumbUpButton");

          this.thumbUpAnimations.push(
            lottie.loadAnimation({
              container:animations[0],
              renderer:'svg',
              autoplay: false,
              loop:false,
              path:'assets/animations/thumb_up.json'
            })
          )
    })
  }
  addSubcommentIndex(comment,index){
    if(index  === comment.comments.length ){
      comment.dahaFazlaGetirText = "HEPSİ BU KADAR :(";
    }
    comment.showUntil += 3;
  }

  deadOnDeadLine(){
    this.benimFirsatimLib.ended(this.opportunity.id).subscribe((response)=>{
    });
    this.dealReported = true;
  }
  dealOutOfStock(){
    this.benimFirsatimLib.stockFinished(this.opportunity.id).subscribe((response)=>{
    });
    this.dealReported = true;
  }
  onReportDeal(){
    this.benimFirsatimLib.report(this.opportunity.id).subscribe((response)=>{
    });
    this.dealReported = true;
  }

  shareDeal() {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Paylaş',
      buttons: [
        {
          text: 'Facebook',
          handler: () => {

            let dealUrl = 'https://www.facebook.com/sharer/sharer.php?u=https%3A//benimfirsatim.com/deal/' + this.opportunity.id
            window.open(dealUrl, '_blank');
            /*const initParams = {
              appId: '113944349294618',
              xfbml: true,
              version: 'v2.8'
            };
            try {
              FB.init(initParams);
            } catch (e) {
              console.log(e);
            }          FB.ui({
              method: 'share',
              mobile_iframe: true,
              quote: this.opportunity.title,
              href: "https://benimfirsatim.com/deal/" + this.opportunity.id,
              hastag: '#benimfirsatim'
            }, function (response) {
            });*/
          }
        }, {
          text: 'Twitter',
          handler: () => {
            // Opens a pop-up with twitter sharing dialog
            var shareURL = "http://twitter.com/share?"; //url base
            //params
            var params = {
              url: "https://benimfirsatim.com/deal/" + this.opportunity.id,
              text: this.opportunity.title,
              // via: "sometwitterusername",
              hashtags: "benimfirsatim"
            }
            for (let prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
            window.open(shareURL, '_blank', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

          }
        }
      ]
    });
    actionSheet.present();
  }
}
