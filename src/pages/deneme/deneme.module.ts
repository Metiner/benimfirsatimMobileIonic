import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DenemePage } from './deneme';

@NgModule({
  declarations: [
    DenemePage,
  ],
  imports: [
    IonicPageModule.forChild(DenemePage),
  ],
})
export class DenemePageModule {}
