import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  @Input() board: string[][];

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
