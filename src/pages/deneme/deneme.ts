import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DenemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deneme',
  templateUrl: 'deneme.html',
})
export class DenemePage {

  param: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.param = navParams.data;
  }

}
