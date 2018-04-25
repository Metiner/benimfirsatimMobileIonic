import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController} from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import {ListDealComponent} from "../../components/list-deal/list-deal";
import {TabsPage} from "../tabs/tabs";


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
              private navCtrl: NavController) {
    benimfirsatimLib.getPage('hot',HighlightsPage.pagination).subscribe((data)=>{

      HighlightsPage.pagination++;
      console.log(data.json());
    data.json().entries.forEach(element => {


        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
    });
    },error=>{
      console.log(error);
    })
  }

  ionViewDidLoad(){
    HighlightsPage.pagination = 1;
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

    this.benimfirsatimLib.getPage('hot',HighlightsPage.pagination).subscribe(data =>{


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
    this.navCtrl.push(TabsPage);
  }

  openFeedbackDiv(){
    this.feedbackDivOpen = true;
  }
}
