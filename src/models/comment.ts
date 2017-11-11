import {User} from "./user";

export class Comment{

  comment_votes_count: number;
  created_at:string;
  deal_id:number;
  id:number;
  text:string;
  updated_at:string;
  user_id:number;
  user: User;
  comments: Comment[] = [];

}
