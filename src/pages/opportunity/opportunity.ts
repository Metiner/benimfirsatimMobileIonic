import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Opportunity} from "../../modals/opportunity";
import {CommentProvider} from "../../providers/CommentProvider";

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
  data: {} = {};
  comments: Array<{owned:string,content:string,showContent: boolean}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private commentProvider:CommentProvider) {
    this.comments.push({owned:'Metiner',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Gökay',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Selin',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Tayyip',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Recep',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Erdoğan',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Fatih',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Sultan',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Mehmet',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Melih',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});
    this.comments.push({owned:'Gökçek',content:'lorem ipsum aslkfj laksjd lşkwjşlk jaşlskj lşkjalşskjd aşlksjd aşslkd',showContent:false});

    this.opportunity = navParams.data;
    this.data = commentProvider.getComments(this.opportunity.id,1);
    console.log(this.data);

  }

  toExpandItem(comment){
    if(!comment.showContent){
      console.log(comment.showContent);
      comment.showContent = true;
    }else{
      comment.showContent = false;
    }
  }








}
