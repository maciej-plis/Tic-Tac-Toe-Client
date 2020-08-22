import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerCardComponent } from './player-card/player-card.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { StoreModule } from '@ngrx/store';
import * as GameDataReducer from './store/reducers/game-data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GameDataEffects } from './store/effects/game-data.effects';

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
