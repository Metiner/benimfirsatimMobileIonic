import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, LoadingController, NavController, Events} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  @ViewChildren('content') rows: QueryList<any>;
  onLoginLogo = false;


  itemone=true;
  itemtwo=true;
  itemthree=true;
  itemfour=true;
  itemfive=true;
  itemsix=true;
  itemseven=true;
  itemeight=true;
  itemnine=true;
  itemten=true;
  itemeleven=true;

  constructor(private benimFirsatimLib: BenimfirsatimLib,
              private navCtrl: NavController,
              private loadingCtrl:LoadingController,
              private eventCtrl:Events,
              private fb:Facebook,
              private googlePlus:GooglePlus){

    this.setItemsBooleanOpposite();
  }

  onLogIn(form:NgForm,itemone,itemtwo,itemthree,itemfour,itemfive,itemsix,itemseven,itemeight,itemnine,itemten){



    this.benimFirsatimLib.signIn(form.value.email, form.value.password).subscribe(data=>{

      this.onLoginLogo = true;
      if(data.json() != null && data.json().success == true ){


        this.setItemsBooleanOpposite();


        setTimeout( ()=>{

          this.setStorageAndUserInfoAfterSuccessLogin(data.json());

          }
        ,1100);

      }
    },error => {

      this.benimFirsatimLib.showAlert(" ","Yanlış e-mail veya parola girdiniz.",["Tamam"]);
    })
  };


  onSignUpButton(itemone,itemtwo,itemthree,itemfour,itemfive,itemsix,itemseven,itemeight,itemnine,itemten){



    this.setItemsBooleanOpposite();

    setTimeout( ()=>{

        this.navCtrl.push(SignupPage);
      }
      ,1100);
  }

  //sets the user info to benimfirsatimlib's static user variable and stores token in local storage
  setStorageAndUserInfoAfterSuccessLogin(data){
    const loading = this.loadingCtrl.create({
      content : "Giriş yapılıyor..."
    });
    loading.present();

    this.benimFirsatimLib.setUserInfoAfterLogin(data.user);
    this.eventCtrl.publish('user.login',' ');
    this.benimFirsatimLib.storageControl("user",data);
    this.navCtrl.push(TabsPage);
    loading.dismiss();
    this.benimFirsatimLib.showToast("Giriş yapıldı",1500,"bottom");
  }


  onFacebookLogin(itemone,itemtwo,itemthree,itemfour,itemfive,itemsix,itemseven,itemeight,itemnine,itemten){





    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res =>{

        console.log(res);
        var fbValues = "&fields=id,name,location,website,picture,email";
        var fbPermission = ["public_profile"];
        var authResponse= res.authResponse;

        this.fb.api("me?"+ fbValues, fbPermission).then(response=>{
          console.log(response);
          let email = response.email;
          let name = response.name;
          let id = response.id;
          let picture = response.picture.data.url;
          this.benimFirsatimLib.signupOrLogin(email,name,picture,id,authResponse,"facebook").subscribe(response=>{

            // It means, email is already being used by another user.
            if(!response.json().success){
              this.benimFirsatimLib.showToast(response.json().message,3000,"bottom");

            }
            if(response.json() != null && response.json().success == true ) {




              this.setItemsBooleanOpposite();



              setTimeout( ()=>{

                  this.setStorageAndUserInfoAfterSuccessLogin(response.json());
                }
                ,1000);

              BenimfirsatimLib.isLoggedInWithFacebook = true;
              this.navCtrl.push(TabsPage);

            }
          }, error=>{
            this.benimFirsatimLib.showToast("Bir hata oluştu",1500,"bottom");
            console.log(error.toLocaleString());
          })
        });
        },

      )
      .catch(e => console.log('Error logging into Facebook', e));
  }

  onGooglePlusLogin(itemone,itemtwo,itemthree,itemfour,itemfive,itemsix,itemseven,itemeight,itemnine,itemten){

    this.googlePlus.login({}).then(response=>{
      let email = response.email;
      let name = response.displayName;
      let id = response.userId;
      let picture = response.imageUrl;


      this.benimFirsatimLib.signupOrLogin(email,name,picture,id,response,"google").subscribe(response=>{



        // It means, email is already being used by another user.
        if(!response.json().success){
          this.benimFirsatimLib.showToast(response.json().message,3000,"bottom");

        }
        if(response.json() != null && response.json().success == true ) {



          this.setItemsBooleanOpposite();

          setTimeout( ()=>{

              this.setStorageAndUserInfoAfterSuccessLogin(response.json());
            }
            ,1000);

          BenimfirsatimLib.isLoggedInWihGoogle = true;
          this.navCtrl.push(TabsPage);
        }

      }, error=>{
        this.benimFirsatimLib.showToast("Bir hata oluştu",1500,"bottom");
        console.log(error.toLocaleString());
      })
    }).catch(e=>{
      console.log('Error logging into Google Plus', e)});

  }

  toTabsPage(){

    this.setItemsBooleanOpposite();

    setTimeout( ()=>{

        this.googlePlus.logout();
        this.navCtrl.push(TabsPage);
      }
      ,1000);
  }
  setItemsBooleanOpposite(){

      setTimeout(()=>{
        this.itemone=! this.itemone;
      },0)
      setTimeout(()=>{
        this.itemtwo=! this.itemtwo;
      },100)
      setTimeout(()=>{
        this.itemthree=! this.itemthree;
      },200)
      setTimeout(()=>{
        this.itemfour=! this.itemfour;
      },300)
      setTimeout(()=>{
        this.itemfive=! this.itemfive;
      },400)
      setTimeout(()=>{
        this.itemsix=! this.itemsix;
      },500)
      setTimeout(()=>{
        this.itemseven=! this.itemseven;
      },600)
      setTimeout(()=>{
        this.itemeight=! this.itemeight;
      },700)
      setTimeout(()=>{
        this.itemnine=! this.itemnine;
      },800)
      setTimeout(()=>{
        this.itemten=! this.itemten;
      },900)
      setTimeout(()=>{
        this.itemeleven=! this.itemeleven;
      },1000)
  }
}
