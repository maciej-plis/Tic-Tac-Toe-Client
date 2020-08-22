import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameService } from './service/game.service';
import { State } from './store/reducers/game-data.reducer';
import * as GameDataActions from './store/actions/game-data.actions';

enum GameStatus {
  NOT_ENOUGH_PLAYERS = "Waiting for more players",
  IN_PROGRESS = "Player %s is moving",
  DRAW = "Game tied",
  WIN = "%s Wins"
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameData: Observable<State>;

  constructor(
    private gameService: GameService,
    private router: Router,
    private store: Store<{gameData: State}>,
  ) { }

  ngOnInit(): void {
    this.gameData = this.store.select(state => {
      return state.gameData;
    });

    this.store.dispatch(GameDataActions.loadGameData());
  }

  leave() {
    this.gameService.leave().subscribe(resp => {
      if(resp.success) {
        this.router.navigate(['join']);
      }
    });
  }

  formatStatusMessage(gameData: State): string {
    return GameStatus[gameData.status] ? GameStatus[gameData.status].replace("%s", gameData.players[gameData.activeSymbol].name) : "";
  }

}
