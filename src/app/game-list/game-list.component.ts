import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/service/game.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  filterGames(keyword: string) {

  }

  joinGame(gameName: string) {

  }

  logout() {

  }

}
