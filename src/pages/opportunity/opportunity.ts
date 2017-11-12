import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NgForm} from "@angular/forms";


/**
 * Generated class for the OpportunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
})
export class OpportunityPage {

  opportunity: Opportunity;
  comments: Comment[] = [];
  static pageCount = 1;

  constructor(public navParams: NavParams,private benimFirsatimLib:BenimfirsatimLib) {
    this.opportunity = navParams.data;
    benimFirsatimLib.getComments(this.opportunity.id,1).subscribe(data =>{
      OpportunityPage.pageCount++;
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
        console.log(element);
        this.comments.push(u);
      })
    });
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


  // Toggle to expand comments.
  toExpandItem(comment){
    if(!comment.showContent){
      console.log(comment.showContent);
      comment.showContent = true;
    }else{
      comment.showContent = false;
    }
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
    });
    form.resetForm();
  }

  checkLogin(){
    this.benimFirsatimLib.checkLogin().subscribe(data=>{
      console.log(data.json());
    })
  }

}
