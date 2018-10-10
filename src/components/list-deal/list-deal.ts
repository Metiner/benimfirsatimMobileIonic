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

  whatIsPrice(){
    try{
      if(this.opportunity.price.indexOf(".0") === -1){
        return this.opportunity.price ? (this.opportunity.price + '₺') : '';
      }else{
        return this.opportunity.price ? (this.opportunity.price.slice(0,this.opportunity.price.indexOf(".")) + '₺') : '';
      }
    }catch (error){
    }

  }
  discount(){
    if(this.opportunity.original_price !== null && this.opportunity.price !== null){
      if(parseFloat(this.opportunity.original_price) !== 0 && parseFloat(this.opportunity.price) !== 0){
        return (((parseFloat(this.opportunity.original_price) - parseFloat(this.opportunity.price)) / parseFloat(this.opportunity.original_price)) * 100).toFixed()
      }
    }
  }
}
