import {Injectable} from "@angular/core";
import {BenimfirsatimLib} from "../services/benimfirsatimLib";

@Injectable()
export class CommentProvider{

  constructor(private benimFirsatimLib:BenimfirsatimLib){}

  public getComments(deal_id,page){

    let comments = {};
    this.benimFirsatimLib.getComments(deal_id,page).subscribe(data =>{
      console.log(data.json());
      comments = data;
    });
    return comments;
  }

}
