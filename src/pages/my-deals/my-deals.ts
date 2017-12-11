import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

/**
 * Generated class for the MyDealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-deals',
  templateUrl: 'my-deals.html',
})
export class MyDealsPage {

  opportunities: Opportunity[] = [];
  static pagination = 1;

  constructor(private benimfirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController) {
    MyDealsPage.pagination = 1;
    this.benimfirsatimLib.getDealFromUser(MyDealsPage.pagination).subscribe((data)=>{

      console.log(data);
      console.log(data.json());
      MyDealsPage.pagination++;
      data.json().forEach(element => {


        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  onOpportunityPage(opportunity: Opportunity){
    this.navCtrl.push(OpportunityPage,opportunity);
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimfirsatimLib.getDealFromUser(MyDealsPage.pagination).subscribe(data =>{


      if(data.json().length > 0) {
        MyDealsPage.pagination++;
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
