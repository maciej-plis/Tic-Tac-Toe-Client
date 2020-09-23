import { NgModule } from '@angular/core';
import { GameListComponent } from './game-list.component';
import { SharedModule } from '../shared/shared.module';
import { GamesSorting } from './games-sorting.pipe';



@NgModule({
  declarations: [GameListComponent, GamesSorting],
  imports: [
    SharedModule,
  ],
  providers: [GamesSorting]
})
export class GameListModule { }
