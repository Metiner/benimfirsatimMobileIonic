import {Injectable} from "@angular/core";
import {BenimfirsatimLib} from "../services/benimfirsatimLib";
import {Comment} from "../modals/comment";

@Injectable()
export class CommentProvider{

  constructor(private benimFirsatimLib:BenimfirsatimLib){}

  public getComments(deal_id,page):Comment[]{

    let comments:Comment[] = [];
    this.benimFirsatimLib.getComments(deal_id,page).subscribe(data =>{
    data.json().forEach(element =>{

      let u:Comment = new Comment();
      Object.assign(u,element);
      comments.push(u);
     })
    });
    return comments;
  }

  getAsyncComment(deal_id,page):Promise<Comment[]>{
    //async receive comment data
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve(this.getComments(deal_id,page));
      },1000);
    });
  }

}
