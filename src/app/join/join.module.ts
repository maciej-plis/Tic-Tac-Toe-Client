import { NgModule } from '@angular/core';
import { JoinComponent } from './join.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [JoinComponent],
  imports: [
    SharedModule
  ]
})
export class JoinModule { }
