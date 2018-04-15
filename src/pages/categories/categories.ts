import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {BenimfirsatimLib} from "../../services/benimfirsatimLib";
import {SelectedCategoryPage} from "../selected-category/selected-category";
import {Category} from "../../models/category";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories: Category[] = [];
  selectedCategoryPage = SelectedCategoryPage;
  constructor(private benimFirsatimLib:BenimfirsatimLib,
              private navCtrl:NavController) {

    this.benimFirsatimLib.getCategories().subscribe(data=>{
      data.json().forEach(element=>{
        let u:Category = new Category();
        Object.assign(u,element);
        this.categories.push(u);
      })
    });
  }

  toTabsPage(){
    this.navCtrl.push(TabsPage);
  }


}
