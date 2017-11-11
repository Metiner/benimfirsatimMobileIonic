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
    benimFirsatimLib.getComments(this.opportunity.id,3).subscribe(data =>{
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
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
    u.text = form.value.comment;
    this.comments.push(u);
  }

  checkLogin(){
    this.benimFirsatimLib.checkLogin().subscribe(data=>{
      console.log(data.json());
    })
  }

}
