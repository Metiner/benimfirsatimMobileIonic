import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedCategoryPage } from './selected-category';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    SelectedCategoryPage
  ],
  imports: [
    IonicPageModule.forChild(SelectedCategoryPage),
    ComponentsModule
  ],
})
export class SelectedCategoryPageModule {}
