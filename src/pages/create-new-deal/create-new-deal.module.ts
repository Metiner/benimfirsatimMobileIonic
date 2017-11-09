import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewDealPage } from './create-new-deal';

@NgModule({
  declarations: [
    CreateNewDealPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewDealPage),
  ],
})
export class CreateNewDealPageModule {}
