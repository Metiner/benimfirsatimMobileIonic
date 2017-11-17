import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NgForm} from "@angular/forms";
import {OnCommentReplyPage} from "../on-comment-reply/on-comment-reply";
import {onCommentExpand, onItemBump} from "../../app/animations";
import {LoginPage} from "../login/login";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  onCommentReplyPage= OnCommentReplyPage;
  loginPage = LoginPage;
  static pageCount = 1;

  constructor(public navParams: NavParams,private benimFirsatimLib:BenimfirsatimLib,private navCtrl:NavController) {
    this.opportunity = navParams.data;
    benimFirsatimLib.getComments(this.opportunity.id,1).subscribe(data =>{
      OpportunityPage.pageCount++;
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
        this.comments.push(u);
      })
    });
  }

  upVoteDeal(dealId:number,upVote:any){

    upVote.stateChanger = !upVote.stateChanger;

    setTimeout(()=>{
      upVote.stateChanger = !upVote.stateChanger;

    },500)
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
            this.comments.push(u);
          })
        }else
        {
          infiniteScroll.enable(false);
          OpportunityPage.pageCount = 1;
        }

        infiniteScroll.complete();
      });

  }
  onCommentSubmit(form:NgForm){
    let u:Comment = new Comment();
    u.user = BenimfirsatimLib.user;
    u.text = form.value.comment;
    u.created_at = (new Date()).toString().split(' ').splice(1,3).join(' ');
    u.deal_id = this.opportunity.id;
    u.user_id = BenimfirsatimLib.user.id;
    this.benimFirsatimLib.createComment(this.opportunity.id,null,form.value.comment).subscribe(data=>{
      console.log(data.json());
    },error2 =>{
      this.benimFirsatimLib.showAlert("Uyarı","Yorum yapmak için üye girişi yapmalısınız.",[
      {
        text:'Giriş Yap',handler:()=>{
        this.navCtrl.push(this.loginPage);
        }
      },
      {
        text:'Vazgeç'
      }])
    });
    form.resetForm();
  }

  onItemBump(i:any,item:any){
    item.i = i;
    setTimeout(()=>{
      item.i=-1
    },200)
  }

  showCommentText(comment:any){
    console.log(comment.showContent);
    comment.showContent = !comment.showContent;
  }
}
