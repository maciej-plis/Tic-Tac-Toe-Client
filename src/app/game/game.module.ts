import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameComponent } from './game.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { GameDataEffects } from './store/game-data.effects';
import * as GameDataReducer from './store/game-data.reducer';

@NgModule({
  declarations: [GameComponent, GameBoardComponent, PlayerCardComponent, StatusBarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(GameDataReducer.gameDataFeatureKey, GameDataReducer.reducer),
    EffectsModule.forFeature([GameDataEffects]),    
  ],
  bootstrap: []
})
export class GameModule { }
