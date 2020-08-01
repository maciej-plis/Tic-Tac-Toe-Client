import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() board: Array<string>;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void { 
  }

  formatTo2Dim(board: Array<string>):Array<Array<string>> {
    const formatedBoard = [];

    let index=0;

    for(let i=0; i<Math.sqrt(board.length); i++) {
      const row = []; 
      for(let i=0; i<Math.sqrt(board.length); i++) {
        row.push(board[index]);
        index++;
      }
      formatedBoard.push(row);
    }

    return formatedBoard;
  }
}
