import {Component} from '@angular/core';
import {Events, InfiniteScroll, IonicPage, NavController} from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import * as $ from 'jquery'


/**
 * Generated class for the HighlightsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-highlights',
  templateUrl: 'highlights.html',
})
export class HighlightsPage {

  opportunities: Opportunity[] = [];
  static pagination = 1;

  feedbackDivOpen = false;

  constructor(private benimfirsatimLib:BenimfirsatimLib,
              private navCtrl: NavController,
              private eventCtrl: Events) {

    this.eventCtrl.subscribe('closeFeedback',()=>{
      this.feedbackDivOpen = false;
    })
  }

  ionViewDidLoad(){

    this.benimfirsatimLib.get_page('',HighlightsPage.pagination).subscribe((data)=>{

      data.json().forEach(element => {

        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    },error=>{
      console.log(error);
    })
  }
  doRefresh(refresher){
    HighlightsPage.pagination = 1;
    this.opportunities.length = 0;
    this.benimfirsatimLib.get_page('',HighlightsPage.pagination).subscribe((data)=>{
      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
      refresher.complete();
    })
  }
  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    if(HighlightsPage.pagination === 1)
      HighlightsPage.pagination = 2
    this.benimfirsatimLib.get_page('',HighlightsPage.pagination).subscribe(data =>{


      if(data.json().length > 0) {
        HighlightsPage.pagination++;

        data.json().forEach(element => {
          let u: Opportunity = new Opportunity();
          Object.assign(u, element);
          this.opportunities.push(u);
        })
      }else
      {
        infiniteScroll.enable(false);
        OpportunityPage.pageCount = 1;
      }

      infiniteScroll.complete();
    });

  }

  toTabsPage(){
    this.navCtrl.popToRoot();
  }

  openFeedbackDiv(){
    this.feedbackDivOpen = true;
  }
}
