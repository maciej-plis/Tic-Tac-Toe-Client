import { Component, OnInit } from '@angular/core';
import { GameData } from './model/GameData';
import { GameService } from './service/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameData: GameData;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.gameData = {
      status: 'GAME IN PROGRESS',
      board: ['X','','O','','X','','X','O','O'],
      player1: {name: 'RICO5k', sign: 'X'},
      player2: {name: 'Franciszek', sign: 'O'}
    }
  }

  formatStatus(status: string): string {
    return status;
  }

  leave() {
    this.gameService.leave();
  }

}
