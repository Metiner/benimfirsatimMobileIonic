import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import {NgForm} from "@angular/forms";
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  onLogIn(form:NgForm){
    console.log(form.value());
  }

}
