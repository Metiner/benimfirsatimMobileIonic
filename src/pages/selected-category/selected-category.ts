import { Component } from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";

@IonicPage()
@Component({
  selector: 'page-selected-category',
  templateUrl: 'selected-category.html',
})
export class SelectedCategoryPage {

  category:any;
  opportunities: Opportunity[] = [];
  opportunityPage = OpportunityPage;
  static pagination = 1;

  constructor(public navParams: NavParams,private benimFirsatimLib:BenimfirsatimLib,private navCtrl:NavController) {
    this.category = this.navParams.data;
    this.benimFirsatimLib.getCategoryDeals(this.category.id,SelectedCategoryPage.pagination).subscribe((data)=>{

      SelectedCategoryPage.pagination++;
      data.json().forEach(element => {


        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimFirsatimLib.getCategoryDeals(this.category.id,SelectedCategoryPage.pagination).subscribe(data =>{

      if(data.json().length > 0) {
        SelectedCategoryPage.pagination++;
        data.json().entries.forEach(element => {
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
  ionViewWillLeave(){
    SelectedCategoryPage.pagination=1;
  }


  goBack(){
    this.navCtrl.pop();
  }

}
