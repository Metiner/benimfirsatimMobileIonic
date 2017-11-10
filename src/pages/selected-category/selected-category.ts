import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Category} from "../../models/category";

@IonicPage()
@Component({
  selector: 'page-selected-category',
  templateUrl: 'selected-category.html',
})
export class SelectedCategoryPage {

  category: Category;
  constructor(public navParams: NavParams) {
    this.category = this.navParams.data;
  }

}
