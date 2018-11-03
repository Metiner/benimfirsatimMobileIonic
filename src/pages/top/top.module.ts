import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPage } from './top';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TopPage
  ],
  imports: [
    IonicPageModule.forChild(TopPage),
    ComponentsModule
  ],
})
export class TopPageModule {}
