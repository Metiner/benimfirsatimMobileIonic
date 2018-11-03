import { NgModule } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback';
import {ListDealComponent} from "./list-deal/list-deal";
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [FeedbackComponent,ListDealComponent],
	imports: [IonicModule],
	exports: [FeedbackComponent, ListDealComponent]
})
export class ComponentsModule {}
