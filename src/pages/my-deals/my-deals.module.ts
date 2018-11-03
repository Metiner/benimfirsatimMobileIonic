import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDealsPage } from './my-deals';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MyDealsPage
  ],
  imports: [
    IonicPageModule.forChild(MyDealsPage),
    ComponentsModule
  ],
})
export class MyDealsPageModule {}
