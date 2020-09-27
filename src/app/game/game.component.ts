import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameService } from './game.service';
import * as GameDataActions from './store/game-data.actions';
import { GameState, State } from './store/game-data.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameData: State;

  constructor(
    private gameService: GameService,
    private router: Router,
    private store: Store<{gameData: State}>,
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.gameData).subscribe(state => {
      this.gameData = state;
    });
    this.store.dispatch(GameDataActions.loadGameData());
  }

  leave() {
    this.gameService.leave().subscribe(resp => {
      if(resp.success) {
        this.router.navigate(['games']);
      }
    });
  }

  rematch() {
    this.gameService.rematch().subscribe(resp => {
      console.log(resp);
    });
  }


  isFinished(): boolean {
    return this.gameData.state == GameState.WIN || this.gameData.state == GameState.DRAW;
  }

}
