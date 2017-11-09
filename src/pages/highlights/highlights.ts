import {Component} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../modals/opportunity";
import {OpportunityPage} from "../opportunity/opportunity";
import {CreateNewDealPage} from "../create-new-deal/create-new-deal";


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

  constructor(benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('hot').subscribe((data)=>{

    data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
    });
    })
  }


}
