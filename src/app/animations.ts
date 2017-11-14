import {animate, state, style, transition, trigger} from "@angular/animations";

export const expandedComment = trigger('onCommentExpand',[
  state('default',style({
    backgroundColor:'white'
  })),
  state('onExpand',style({
    backgroundColor:'Gold'
  })),
  transition('default <=> onExpand',animate(300),style({backgroundColor:'white'}))
])
