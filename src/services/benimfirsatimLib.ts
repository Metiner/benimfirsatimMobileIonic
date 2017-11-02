import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do'


@Injectable()
export class BenimfirsatimLib{
  api_address = "https://benimfirsatim.com";


  constructor(private http:Http){}

  //Page code can be,
  //'hot','rising' or 'newcomers'
  public getPage(page_code){
      let possible_page_codes = ['hot','rising','newcomers'];
      if(possible_page_codes.indexOf(page_code)=== -1){
        return;

      }
      return this.http.get(this.api_address + '/'+page_code+'.json',{});
  }


  public signUp(email,password){
    console.log(email +' '+ password);
    return this.http.post(this.api_address + '/users',{"user[email]":email,"user[password]":password,"user[password_again]":password});
  }

  public signIn(email,password){
    return this.http.post(this.api_address + '/users/sing_in',{"user[email]":email,"user[password]":password});
  }


}
