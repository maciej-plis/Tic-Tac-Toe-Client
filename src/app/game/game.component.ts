import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameService } from './game.service';
import * as GameDataActions from './store/game-data.actions';
import { GameState, State, Symbol } from './store/game-data.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  symbols = Symbol;

  errorMessage: string;
  gameData: State;
  
  messages = [
    {sender: "superuser", content: "Chat logic is not implemented yet"}
  ]

  constructor(
    private gameService: GameService,
    private router: Router,
    private store: Store<{gameData: State}>,
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.gameData).subscribe(state => {
      this.errorMessage = null;
      this.gameData = state;
      console.log(state.players);
    });
    this.store.dispatch(GameDataActions.loadGameData());
  }

  leave() {
    this.gameService.leave().subscribe(resp => {
      this.router.navigate(['games']);
    }, error => {
      this.errorMessage = error.error;
    });
  }

  rematch() {
    this.gameService.rematch().subscribe(null, error => this.setError(error.error));
  }

  isFinished(): boolean {
    return this.gameData.state == GameState.WIN || this.gameData.state == GameState.DRAW;
  }

  setError = (error: string) => {
    this.errorMessage = error;
  }

}
