import {Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../modals/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import {DenemePage} from "../deneme/deneme";


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
  opportunityPage = OpportunityPage;
  denemePage= DenemePage;

  constructor(public navCtrl: NavController,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('hot').subscribe((data)=>{

    data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
    });
    })
  }


}
