import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Symbol } from '../store/game-data.reducer';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  Symbol = Symbol;

  @Input() board: Symbol[][];
  @Input() errorCallback: Function;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void { 
  }

  mark(x: number, y: number) {
    this.gameService.mark(x ,y).subscribe(null, error => this.errorCallback(error.error));
  }
}
