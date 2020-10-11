import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FocusDirective } from './directives/focus.directive';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    LogoComponent,
    FocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LogoComponent,
    FocusDirective,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
