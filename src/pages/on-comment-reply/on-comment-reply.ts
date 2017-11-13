import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comment = this.navParams.data;
  }

}
