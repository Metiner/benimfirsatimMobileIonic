import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'


@Injectable()
export class BenimfirsatimLib{
  api_address = "http://localhost:3000/";

  constructor(private http:Http){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code){
      let possible_page_codes = ['hot','rising','newcomers'];
      if(possible_page_codes.indexOf(page_code)=== -1){
        return;

      }
      return this.http.get(this.api_address + '/'+page_code+'.json');
  }


  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users.json',{"user":{"email":email,"password":password}});
  }

  public signIn(email,password){
    return this.http.post(this.api_address + '/users/sing_in.json',{"user":{"email":email,"password":password}});
  }

  public getDeal(deal_id){
    return this.http.get(this.api_address + '/deals/0/'+deal_id.toString() + '/');
  }

  public upvoteDeal(deal_id){
    return this.http.get(this.api_address + '/deals/'+deal_id.toString() + '/upvote');
  }

  public downvoteDeal(deal_id){
    return this.http.get(this.api_address + '/deals/'+deal_id.toString() + '/downvote');
  }

  public createComment(deal_id,parent_comment_id){
    return this.http.post(this.api_address + '/deals/' + deal_id +'/comments.json',{parent_comment_id:parent_comment_id});
  }

  public commentVote(comment_id){
    return this.http.post(this.api_address + '/comments/'+comment_id+'/vote',{});
  }


}
