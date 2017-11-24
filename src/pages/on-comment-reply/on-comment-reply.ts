import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavParams} from 'ionic-angular';
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
  @ViewChild(Content) content:Content;
  comment: Comment;
  opportunity: Opportunity;

  constructor(public navParams: NavParams, private benimFirsatimLib: BenimfirsatimLib) {
    this.comment = this.navParams.get('comment');
    this.opportunity = this.navParams.get('opportunity');

  }

  onCommentSubmit(form: NgForm) {
    this.benimFirsatimLib.createComment(this.opportunity.id, this.comment.id, form.value.comment).subscribe(data => {
      let newlyAdded:Comment = new Comment();
      newlyAdded.user = BenimfirsatimLib.user;
      newlyAdded.text = form.value.comment;
      newlyAdded.created_at = (new Date()).toString().split(' ').splice(1,3).join(' ');
      newlyAdded.deal_id = this.opportunity.id;
      newlyAdded.user_id = BenimfirsatimLib.user.id;
      newlyAdded.comment_votes_count = 0;
      newlyAdded.newlyAdded = 'newlyAdded';
      this.comment.comments.push(newlyAdded);
      setTimeout(()=>{
        this.scrollToNewlyAddedComment();
      },200)
      form.reset();
    });


  }

  scrollToNewlyAddedComment(){

    let newlyAddedComment:any = document.getElementById('newlyAdded');
    this.content.scrollTo(0,newlyAddedComment.offsetTop,1000);


  }
}
