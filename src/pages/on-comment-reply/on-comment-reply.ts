import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";

/**
 * Generated class for the OnCommentReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-on-comment-reply',
  templateUrl: 'on-comment-reply.html',
})
export class OnCommentReplyPage {

  comment: Comment;
  opportunity: Opportunity;
  constructor(public navParams: NavParams,private benimFirsatimLib:BenimfirsatimLib) {
    this.comment = this.navParams.get('comment');
    this.opportunity = this.navParams.get('opportunity');

  }



  onCommentSubmit(form:NgForm){
      this.benimFirsatimLib.createComment(this.opportunity.id,this.comment.id,form.value.comment).subscribe(data=>{
        this.comment.comments.push(data.json())
        form.reset();
      });
  }

}
