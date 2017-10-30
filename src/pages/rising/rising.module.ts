import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RisingPage } from './rising';

@NgModule({
  declarations: [
    RisingPage,
  ],
  imports: [
    IonicPageModule.forChild(RisingPage),
  ],
})
export class RisingPageModule {}
