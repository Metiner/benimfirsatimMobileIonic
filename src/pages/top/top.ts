import { Component } from '@angular/core';
import {Events, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {OpportunityPage} from "../opportunity/opportunity";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the TopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top',
  templateUrl: 'top.html',
})
export class TopPage {

  opportunities: Opportunity[] = [];
  static pagination = 1;
  feedbackDivOpen = false;

  constructor(public navParams: NavParams,
              private benimfirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController,
              private eventCtrl: Events) {

    this.eventCtrl.subscribe('closeFeedback',()=>{
    this.feedbackDivOpen = false;
    });

    benimfirsatimLib.get_page('/fresh',TopPage.pagination).subscribe((data)=>{
      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimfirsatimLib.get_page('/fresh',TopPage.pagination).subscribe(data =>{
      if(TopPage.pagination === 1)
        TopPage.pagination = 2


      if(data.json().length > 0) {
        TopPage.pagination++;
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
