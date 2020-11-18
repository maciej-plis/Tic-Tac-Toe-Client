import { Component, Input, OnInit } from '@angular/core';
import { Player, Symbol } from '../store/game-data.reducer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  @Input() player: Player;
  @Input() symbol: Symbol;

  constructor() { }

  ngOnInit(): void {
  
  }

}
