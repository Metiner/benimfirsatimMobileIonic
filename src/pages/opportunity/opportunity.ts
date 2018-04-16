import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
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

  likeButtonAnimation:any;
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
              private browserTab:BrowserTab) {
    this.loadAnimations();
    OpportunityPage.pageCount = 1;
    this.opportunity = navParams.data;
    benimFirsatimLib.getComments(this.opportunity.id,1).subscribe(data =>{
      console.log(data.json());
      OpportunityPage.pageCount++;
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
        u.showUntil = 2;
        u.dahaFazlaGetirText = 'DAHA FAZLA GETİR';
        console.log(u);
        this.comments.push(u);
      })

      this.loadThumbsupAnimations();
    });

    this.setItemsBooleanOpposite()
  }

  upVoteDeal(dealId:number){

    this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });
  }

  downVoteDeal(dealId:number){

    this.benimFirsatimLib.downvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });
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

        infiniteScroll.complete();
      });

  }
  isPriceToolong(){
    return this.opportunity.price ? (this.opportunity.price.length > 5 ? '20px' : this.opportunity.price.length > 6 ? '19px' : '25px') : '25px';
  }
  whatIsPrice(){
    return this.opportunity.price ? (this.opportunity.price + '₺') : '';
  }


  onCommentSubmit(form:NgForm){


    this.benimFirsatimLib.checkAuthFromStorage().then(response => {
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
    }).catch(error => {
      this.benimFirsatimLib.showToast(error.toLocaleString(),3000,'bottom')
    })

  }



  scrollToNewlyAddedComment(){


    this.content.scrollTo(0,400,1000);
    this.loadSingleThumbsupAnimation();

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
    this.navCtrl.pop();
  }

  onCommentReply(commentInfo){
    this.navCtrl.push(this.onCommentReplyPage,commentInfo);
  }

  playAnim(index,type,comment) {
    if(type === 'like'){
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
    console.log(comment.comments.length + " " + index);
    if(index  === comment.comments.length ){
      comment.dahaFazlaGetirText = "HEPSİ BU KADAR :(";
    }
    comment.showUntil += 3;
  }
}
