import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FocusDirective } from './directives/focus.directive';



@NgModule({
  declarations: [
    FocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    FocusDirective,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
