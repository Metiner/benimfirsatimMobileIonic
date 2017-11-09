import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

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
      this.comments = data.json();
    });
  }

  upVoteDeal(dealId:number){
    this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      console.log(data);
    });
  }

  downVoteDeal(dealId:number){
    this.benimFirsatimLib.downvoteDeal(dealId).subscribe(data=>{
      console.log(data);
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


}
