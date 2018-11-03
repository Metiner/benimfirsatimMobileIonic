import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RisingPage } from './rising';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RisingPage
  ],
  imports: [
    IonicPageModule.forChild(RisingPage),
    ComponentsModule
  ],
})
export class RisingPageModule {}
