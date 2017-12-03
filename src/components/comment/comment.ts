import {Component, Input} from '@angular/core';
import {onCommentExpand} from "../../app/animations";

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
    onCommentExpand
  ]
})
export class CommentComponent {

  @Input() comment : Comment;

  constructor() {
  }

}
