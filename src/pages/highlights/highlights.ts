import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {Opportunity} from "../../modals/opportunity";


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
export class HighlightsPage implements OnInit{

  opportunities: Opportunity[] = [];

  constructor(public navCtrl: NavController,benimfirsatimLib:BenimfirsatimLib) {
    benimfirsatimLib.getPage('hot').subscribe((data)=>{

    data.json().forEach(element => {
        let u:Opportunity = new Opportunity();
        Object.assign(u,element);
        this.opportunities.push(u);
    });
    console.log(this.opportunities);




    })
  }

  ngOnInit(){

  }


}
