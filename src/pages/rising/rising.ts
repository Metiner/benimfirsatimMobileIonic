import { Component } from '@angular/core';
import {Events, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";

/**
 * Generated class for the RisingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rising',
  templateUrl: 'rising.html',
})
export class RisingPage {

  opportunities: Opportunity[] = [];
  static pagination = 1;
  feedbackDivOpen = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,

              public benimfirsatimLib:BenimfirsatimLib,
              private eventCtrl: Events) {

  this.eventCtrl.subscribe('closeFeedback',()=>{
  this.feedbackDivOpen = false;
    })
  }


  ionViewDidLoad(){
    this.benimfirsatimLib.get_page('/rising',RisingPage.pagination).subscribe((data)=>{

      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  doRefresh(refresher){
    RisingPage.pagination = 1;
    this.opportunities.length = 0;
    this.benimfirsatimLib.get_page('/rising',RisingPage.pagination).subscribe((data)=>{
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
    if(RisingPage.pagination === 1){
      RisingPage.pagination = 2;
    }
    this.benimfirsatimLib.get_page('/rising',RisingPage.pagination).subscribe(data =>{
      if(data.json().length > 0) {
        RisingPage.pagination++;
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
