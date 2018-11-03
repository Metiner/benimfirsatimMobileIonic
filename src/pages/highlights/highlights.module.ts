import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HighlightsPage } from './highlights';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [HighlightsPage
  ],
  imports: [
    IonicPageModule.forChild(HighlightsPage),
    ComponentsModule
  ]
})
export class HighlightsPageModule {}
