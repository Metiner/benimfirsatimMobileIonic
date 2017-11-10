import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedCategoryPage } from './selected-category';

@NgModule({
  declarations: [
    SelectedCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedCategoryPage),
  ],
})
export class SelectedCategoryPageModule {}
