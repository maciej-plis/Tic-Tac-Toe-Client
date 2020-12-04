import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameComponent } from './game.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { GameDataEffects } from './store/game-data.effects';
import * as GameDataReducer from './store/game-data.reducer';
import { ScrollDownDirective } from './scroll-down.directive';

@NgModule({
  declarations: [GameComponent, GameBoardComponent, PlayerCardComponent, StatusBarComponent, ScrollDownDirective],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature(GameDataReducer.gameDataFeatureKey, GameDataReducer.reducer),
    EffectsModule.forFeature([GameDataEffects]),    
  ],
  bootstrap: []
})
export class GameModule { }
