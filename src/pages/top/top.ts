import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navParams: NavParams,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('newcomers').subscribe((data)=>{
      data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
      });
    })
  }

}
