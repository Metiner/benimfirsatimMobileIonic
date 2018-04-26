import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Events} from "ionic-angular";

/**
 * Generated class for the FeedbackComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackComponent {

  konular = [{id:1,name:'Şikayet'},{id:2,name:'Öneri'},{id:3,name:'İstek'}];
  constructor(private eventCtrl: Events) {
  }

  onFeedbackSubmit(f:NgForm){
    this.eventCtrl.publish('closeFeedback');
    console.log(f.value);
  }

}
