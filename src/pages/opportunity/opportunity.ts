import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Opportunity} from "../../modals/opportunity";

/**
 * Generated class for the OpportunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
})
export class OpportunityPage {

  opportunity: Opportunity;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.opportunity = navParams.data;
  }




}
