import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib){}

  onSignUp(form: NgForm){
    console.log(form.value);
    this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data=>{
      console.log(data);
    });

  }
}
