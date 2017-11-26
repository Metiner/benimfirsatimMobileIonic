import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDealsPage } from './my-deals';

@NgModule({
  declarations: [
    MyDealsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDealsPage),
  ],
})
export class MyDealsPageModule {}
