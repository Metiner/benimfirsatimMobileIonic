import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../modals/opportunity";
import {CommentProvider} from "../../providers/CommentProvider";
import {Comment} from "../../modals/comment";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private commentProvider:CommentProvider) {

    this.opportunity = navParams.data;
    this.comments = commentProvider.getComments(this.opportunity.id,1);

  }

  toExpandItem(comment){
    if(!comment.showContent){
      console.log(comment.showContent);
      comment.showContent = true;
    }else{
      comment.showContent = false;
    }
  }

  doInfinite(infiniteScroll:InfiniteScroll){
    this.commentProvider.getAsyncComment(this.opportunity.id,1).then(data=>{
      for(let comment of data){
        console.log(comment);
      }
      infiniteScroll.complete();
    })
  }








}
