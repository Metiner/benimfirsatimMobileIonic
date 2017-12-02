import { NgModule } from '@angular/core';
import { ListDealComponent } from './list-deal/list-deal';
import { CommentComponent } from './comment/comment';
@NgModule({
	declarations: [ListDealComponent,
    CommentComponent],
	imports: [],
	exports: [ListDealComponent,
    CommentComponent]
})
export class ComponentsModule {}
