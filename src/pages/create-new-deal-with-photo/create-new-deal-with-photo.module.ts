import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewDealWithPhotoPage } from './create-new-deal-with-photo';

@NgModule({
  declarations: [
    CreateNewDealWithPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewDealWithPhotoPage),
  ],
})
export class CreateNewDealWithPhotoPageModule {}
