import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
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

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getMessage(): string {
    const user = this.authService.getAuthenticatedUser();
    
    switch(this.gameState) {
      case GameState.NOT_ENOUGH_PLAYERS: return `Waiting for more players`;
      case GameState.IN_PROGRESS: return (user.name == this.activePlayer.name) ? "You are moving" : `Player ${this.activePlayer.name} is now moving`;
      case GameState.DRAW: return `Game tied`;
      case GameState.WIN: return (user.name == this.activePlayer.name) ? "You WON!" : `Player ${this.activePlayer.name} WON!`;
    }
  }

}
