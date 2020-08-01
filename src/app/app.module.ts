import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gameReducer } from './game/store/game.reducer';
import { GameEffects } from './game/store/game.effects';
import { JoinComponent } from './join/join.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    StoreModule.forRoot({ gameState: gameReducer }),
    EffectsModule.forRoot([GameEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
