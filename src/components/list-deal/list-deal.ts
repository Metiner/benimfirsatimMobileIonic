import {Component, Input} from '@angular/core';
import {OpportunityPage} from "../../pages/opportunity/opportunity";
import {NavController} from "ionic-angular";
import * as lottie from 'lottie-web';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import * as $ from 'jquery'




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

  @Input() opportunity : any = {};

  logoComesFromLeft: boolean = false;
  likeButtonAnimation:any;
  unique_id = 0;

  constructor(public navCont:NavController,
              private benimFirsatimLib: BenimfirsatimLib) {

    this.logoComesFromLeft = true;
    this.unique_id = Date.now()+((Math.random()*10000) +1);

  }

  onOpportunityPage(){
    this.navCont.push(OpportunityPage,this.opportunity);
  }

  ngAfterViewInit(){
    let container_div = document.getElementById("lottie_like_button_" + this.unique_id)

    this.loadAnimations(container_div)
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
  loadAnimations(container_div){
    $(document).ready(()=>{
      this.likeButtonAnimation = lottie.loadAnimation({
        container: container_div, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/animations/like_button.json' // the path to the animation json
      });
    })
  }
  upVoteDeal(dealId:number){

    this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      if(data.json().deal_owner){
        this.benimFirsatimLib.showToast("OOPS, KENDİ FİRSATİNİ BEĞENEMEZSİN.", 2000, "bottom");
      }else{
        this.opportunity.votes_sum = data.json().votes_sum;
        this.likeButtonAnimation.play();
        if (this.likeButtonAnimation.liked) {
          this.likeButtonAnimation.setDirection(-1);
          this.likeButtonAnimation.liked = false;

        } else {
          this.likeButtonAnimation.setDirection(1);
          this.likeButtonAnimation.liked = true;
        }
      }
    });
  }
  shareDeal(type) {

    switch (type){
      case 'fb':
        let dealUrl = 'https://www.facebook.com/sharer/sharer.php?u=https%3A//benimfirsatim.com/deals/' + this.opportunity.slug;
        window.open(dealUrl, '_blank');
        break;
      case 'tw':
        // Opens a pop-up with twitter sharing dialog
        let shareURL = "http://twitter.com/share?"; //url base
        //params
        let params = {
          url: "https://benimfirsatim.com/deals/" + this.opportunity.slug,
          text: this.opportunity.title,
          // via: "sometwitterusername",
          hashtags: "benimfirsatim"
        }
        for (let prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
        window.open(shareURL, '_blank');
        break;

    }

  }

}
