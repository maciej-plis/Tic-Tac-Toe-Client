import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerCardComponent } from './player-card/player-card.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [GameComponent, GameBoardComponent, PlayerCardComponent, StatusBarComponent],
  imports: [
    CommonModule,
    HttpClientModule    
  ],
  bootstrap: []
})
export class GameModule { }
