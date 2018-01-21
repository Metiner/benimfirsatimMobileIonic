import {Component, Input} from '@angular/core';
import {onCommentExpand, onItemBump} from "../../app/animations";
import {OnCommentReplyPage} from "../../pages/on-comment-reply/on-comment-reply";
import {Opportunity} from "../../models/opportunity";
import {NavController} from "ionic-angular";

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html',
  animations: [
    onCommentExpand,
    onItemBump
  ]
})
export class CommentComponent {

  @Input() comment : Comment;
  @Input() opportunity: Opportunity;

  onCommentReplyPage= OnCommentReplyPage;
  constructor(private navCtrl:NavController) {
  }

  onItemBump(i:any,item:any){
    item.i = i;
    setTimeout(()=>{
      item.i=-1
    },200)
  }

  onCommentReply(commentInfo){
    this.navCtrl.push(this.onCommentReplyPage,commentInfo);
  }
}
