import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {OpportunityPage} from "../opportunity/opportunity";

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
  opportunityPage = OpportunityPage;
  static pagination = 1;


  constructor(public navParams: NavParams,private benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('newcomers',TopPage.pagination).subscribe((data)=>{
      data.json().entries.forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  ionViewDidLoad(){
    TopPage.pagination = 1;
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimfirsatimLib.getPage('newcomers',TopPage.pagination).subscribe(data =>{


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

}
