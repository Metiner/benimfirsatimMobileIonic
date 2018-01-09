import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('rising',RisingPage.pagination).subscribe((data)=>{

      RisingPage.pagination++;
      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimfirsatimLib.getPage('rising',RisingPage.pagination).subscribe(data =>{


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

}
