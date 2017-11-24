import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Opportunity} from "../../models/opportunity";
import {Comment} from "../../models/comment";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {NgForm} from "@angular/forms";
import {OnCommentReplyPage} from "../on-comment-reply/on-comment-reply";
import {onCommentExpand, onItemBump} from "../../app/animations";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-opportunity',
  templateUrl: 'opportunity.html',
  animations:[
    onItemBump,
    onCommentExpand
]
})
export class OpportunityPage {

  opportunity: Opportunity;
  comments: Comment[] = [];
  onCommentReplyPage= OnCommentReplyPage;
  loginPage = LoginPage;
  toHighlight = false;
  comment = "ne düşünüyorsun";
  static pageCount = 1;
  @ViewChild(Content) content:Content;


  constructor(public navParams: NavParams,
              private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController) {
    this.opportunity = navParams.data;
    benimFirsatimLib.getComments(this.opportunity.id,1).subscribe(data =>{
      OpportunityPage.pageCount++;
      data.json().forEach(element=>{
        let u:Comment = new Comment();
        Object.assign(u,element);
        this.comments.push(u);
      })
    });
  }

  upVoteDeal(dealId:number,upVote:any){

    upVote.stateChanger = !upVote.stateChanger;

    setTimeout(()=>{
      upVote.stateChanger = !upVote.stateChanger;

    },500)
    this.benimFirsatimLib.upvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });
  }

  downVoteDeal(dealId:number){
    this.benimFirsatimLib.downvoteDeal(dealId).subscribe(data=>{
      this.opportunity.votes_sum = data.json().deal_score;
    });
  }

  //Async calls new comments from database.
  doInfinite(infiniteScroll:InfiniteScroll){

      this.benimFirsatimLib.getComments(this.opportunity.id,OpportunityPage.pageCount).subscribe(data =>{


        if(data.json().length > 0) {
          OpportunityPage.pageCount++;
          data.json().forEach(element => {
            let u: Comment = new Comment();
            Object.assign(u, element);
            this.comments.push(u);
          })
        }else
        {
          infiniteScroll.enable(false);
          OpportunityPage.pageCount = 1;
        }

        infiniteScroll.complete();
      });

  }


  onCommentSubmit(form:NgForm){
    if(this.benimFirsatimLib.checkAuthFromStorage()){
      this.benimFirsatimLib.showAlert("Uyarı","Yorum yapmak için üye girişi yapmalısınız.",[
        {
          text:'Giriş Yap',handler:()=>{
          this.navCtrl.push(this.loginPage);
        }
        },
        {
          text:'Vazgeç'
        }])
    }else{
        let newlyAdded:Comment = new Comment();
        newlyAdded.user = BenimfirsatimLib.user;
        newlyAdded.text = form.value.comment;
        newlyAdded.created_at = (new Date()).toString().split(' ').splice(1,3).join(' ');
        newlyAdded.deal_id = this.opportunity.id;
        newlyAdded.user_id = BenimfirsatimLib.user.id;
        newlyAdded.comment_votes_count = 0;
        this.benimFirsatimLib.createComment(this.opportunity.id,null,form.value.comment).subscribe(data=>{
          newlyAdded.newlyAdded = 'newlyAdded';
          const tempComments=this.comments;
          this.comments = [];
          this.comments.push(newlyAdded);
          tempComments.forEach(element=>{
            this.comments.push(element);
          })
          setTimeout(()=>{
            this.scrollToNewlyAddedComment();
          },200)

        },error2 =>{
          console.log(error2);
        });
        form.resetForm();
    }
  }

  onItemBump(i:any,item:any){
    item.i = i;
    setTimeout(()=>{
      item.i=-1
    },200)
  }

  scrollToNewlyAddedComment(){

    let newlyAddedComment:any = document.getElementById('newlyAdded');
    this.content.scrollTo(0,newlyAddedComment.offsetTop,1000);


  }
}
