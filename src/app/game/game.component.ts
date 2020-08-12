import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameData, GameService } from './service/game.service';

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

  gameData: GameData;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameService.getGameData().subscribe(resp => {
      this.gameData = resp;
    });
  }

  leave() {
    this.gameService.leave().subscribe(resp => {
      if(resp.success) {
        this.router.navigate(['join']);
      }
    });
  }

  formatStatusMessage(status: string) {
    return GameStatus[status].replace("%s", this.gameData.tour);
  }

}
