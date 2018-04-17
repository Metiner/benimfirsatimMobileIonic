import {Component, Input} from '@angular/core';
import {Opportunity} from "../../models/opportunity";
import {OpportunityPage} from "../../pages/opportunity/opportunity";
import {NavController} from "ionic-angular";


/**
 * Generated class for the ListDealComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-deal',
  templateUrl: 'list-deal.html'
})
export class ListDealComponent {

  @Input() opportunity : Opportunity;
  logoComesFromLeft: boolean = false;
  constructor(private navCont:NavController) {

    this.logoComesFromLeft = true;
  }



  onOpportunityPage(opportunity: Opportunity){
    this.navCont.push(OpportunityPage,this.opportunity);
  }

  isPriceToolong(){
    return this.opportunity.price ? (this.opportunity.price.length > 5 ? '20px' : this.opportunity.price.length > 6 ? '19px' : '25px') : '25px';
  }
  whatIsPrice(){
    if(this.opportunity.price.indexOf(".0") === -1){
      return this.opportunity.price ? (this.opportunity.price + '₺') : '';
    }else{
      return this.opportunity.price ? (this.opportunity.price.slice(0,this.opportunity.price.indexOf(".")) + '₺') : '';
    }
  }

}
