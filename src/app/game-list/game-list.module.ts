import { NgModule } from '@angular/core';
import { GameListComponent } from './game-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [GameListComponent],
  imports: [
    SharedModule,
  ]
})
export class GameListModule { }
