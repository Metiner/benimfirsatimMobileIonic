import {Component, ViewChild} from '@angular/core';
import {
  ActionSheetController, Content, InfiniteScroll, IonicPage, NavController, NavParams,
  Platform
} from 'ionic-angular';
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
import {AdMobPro} from "@ionic-native/admob-pro";

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

  opportunity:any = {};
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

  newlyAddedComments = [];

  constructor(public navParams: NavParams,
              private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController,
              private browserTab:BrowserTab,
              public actionSheetCtrl: ActionSheetController,
              public platform:Platform,
              private admob: AdMobPro) {




    BenimfirsatimLib.showAd++;
    if(BenimfirsatimLib.showAd % 3 === 0){
      let adId;
      if(this.platform.is('android')) {
        adId = 'ca-app-pub-9661165663851840/8998993983';
      } else if (this.platform.is('ios')) {
        adId = 'ca-app-pub-9661165663851840/7107343722';
      }
      this.admob.prepareInterstitial({
        adId: adId,
        autoShow: true,
        isTesting: false
      })
        .then(() => { this.admob.showInterstitial(); });


    }
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

  }
  ionViewDidLoad() {
    this.admob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
  }

  upVoteDeal(dealId:number){

    this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      if(data.json().deal_owner){
        this.benimFirsatimLib.showToast("OOPS, KENDİ FİRSATİNİ BEĞENEMEZSİN.", 2000, "bottom");
      }else{
        this.opportunity.votes_sum = data.json().votes_sum;
      }
    });
  }

  /*downVoteDeal(dealId:number){
    this.benimFirsatimLib.downvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });
  }*/

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


    let response = this.benimFirsatimLib.check_auth();
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
    if(type === 'like'){
      this.likeButtonAnimation.play();
      if(this.likeButtonAnimation.liked){
        this.upVoteDeal(this.opportunity.id);
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
        comment.comment_votes_count = response.json().comment_vote_count;
      })
      if(this.thumbUpAnimations[index].liked){
        this.thumbUpAnimations[index].setDirection(-1);
        this.thumbUpAnimations[index].liked = false;
      }else{
        this.thumbUpAnimations[index].setDirection(1);
        this.thumbUpAnimations[index].liked = true;
      }
    }
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
              path:'assets/animations/thumb_up_icon_round.json'
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
  }
  dealOutOfStock(){
    this.benimFirsatimLib.stockFinished(this.opportunity.id).subscribe((response)=>{
    });
  }
  onReportDeal(){
    this.benimFirsatimLib.report(this.opportunity.id).subscribe((response)=>{
    });
  }

  shareDeal(type) {

    switch (type){
      case 'fb':
        let dealUrl = 'https://www.facebook.com/sharer/sharer.php?u=https%3A//benimfirsatim.com/deals/' + this.opportunity.slug
        window.open(dealUrl, '_blank');
        break;
      case 'tw':
        // Opens a pop-up with twitter sharing dialog
        let shareURL = "http://twitter.com/share?"; //url base
        //params
        let params = {
          url: "https://benimfirsatim.com/deals/" + this.opportunity.slug,
          text: this.opportunity.title,
          // via: "sometwitterusername",
          hashtags: "benimfirsatim"
        }
        for (let prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
        window.open(shareURL, '_blank');
        break;

    }

  }

  discount(){
    if(this.opportunity.original_price !== null && this.opportunity.price !== null){
      if(parseFloat(this.opportunity.original_price) !== 0 && parseFloat(this.opportunity.price) !== 0){
        return (((parseFloat(this.opportunity.original_price) - parseFloat(this.opportunity.price)) / parseFloat(this.opportunity.original_price)) * 100).toFixed()
      }
    }
  }
}
