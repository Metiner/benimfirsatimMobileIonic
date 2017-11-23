import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private benimFirsatimLib: BenimfirsatimLib,private navCtrl:NavController){}

  onSignUp(form: NgForm){

    //check if passwords are different
    if(!form.value.password == form.value.passwordTwo){
      this.benimFirsatimLib.showToast("Parolalar uyuşmamakta",3000,"bottom");
    }else{

      this.benimFirsatimLib.signUp(form.value.email, form.value.password).subscribe(data=>{

        if(data.json != null){

          if(data.json() != null && data.json().state.code == 0){
            this.benimFirsatimLib.showToast("Kullanıcı oluşturuldu",3000,"bottom");
            this.navCtrl.push(LoginPage);

          }else if (data.json().state.code == 1){
            this.benimFirsatimLib.showToast(data.json().state.messages[0],3500,"bottom");
            form.reset();
          }
        }
      },error =>{
          this.benimFirsatimLib.showAlert("",error,["Tamam"]);
      });
      }
  }
  toTabsPage(){
    this.navCtrl.push(TabsPage);
  }


}
