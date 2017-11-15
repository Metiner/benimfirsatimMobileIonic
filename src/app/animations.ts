import {animate, state, style, transition, trigger} from "@angular/animations";

export const onItemBump = trigger('onItemBump',[
  state('default',style({
    color: '#42b7ff'
  })),
  state('onBump',style({
    transform:'scale(0.5)'
  })),
  transition('default <=> onBump',[
    animate(300)])
])
