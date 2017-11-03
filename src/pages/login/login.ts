import { Component } from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib,private navCtrl: NavController){}

  onLogIn(form:NgForm){
    console.log(form.value);
    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data=>{
      console.log(data);
    });
  }

  onSignUpButton(){
    this.navCtrl.push(SignupPage);
  }

}
