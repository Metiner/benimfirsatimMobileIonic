import {Component, Input} from '@angular/core';
import {Opportunity} from "../../models/opportunity";

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

  constructor() {

  }

}
