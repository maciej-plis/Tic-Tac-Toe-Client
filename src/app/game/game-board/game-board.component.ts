import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Symbol } from '../store/reducers/game-data.reducer';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  Symbol = Symbol;

  @Input() board: Symbol[][];

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit(): void { 
  }

  mark(x: number, y: number) {
    this.gameService.mark(x ,y).subscribe(resp => {
      console.log(resp);
    })
  }
}
