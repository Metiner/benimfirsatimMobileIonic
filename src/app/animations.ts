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
]);

export const onCommentExpand = trigger("onCommentExpand",[
  state('toExpand',style({transform:'scale(1.05)'})),
  transition('void <=> toExpand',animate(300)

  )]);

export const onPictureSelectAnimation = trigger('onPictureSelectAnimation',[
  state('toSelected',style({marginRight:'20px',marginLeft:'20px',transform:'scale(1.15)'})),
  transition('* <=> *', animate(500))
]);



