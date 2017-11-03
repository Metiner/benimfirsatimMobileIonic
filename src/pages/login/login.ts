import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib){}

  onLogIn(form:NgForm){
    console.log(form.value);
    this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data=>{
      console.log(data);
    });
  }

}
