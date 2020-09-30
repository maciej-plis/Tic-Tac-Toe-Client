import { Component, Input, OnInit } from '@angular/core';
import { GameState, Player } from '../store/game-data.reducer';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() gameState: GameState;
  @Input() activePlayer: Player;

  constructor() { }

  ngOnInit(): void {
  }

  getMessage(): string {
    switch(this.gameState) {
      case GameState.NOT_ENOUGH_PLAYERS: return `Waiting for more players`;
      case GameState.IN_PROGRESS: return `Player ${this.activePlayer.name} is now moving`;
      case GameState.DRAW: return `Game tied`;
      case GameState.WIN: return `Player ${this.activePlayer.name} WON!`;
    }
  }

}
