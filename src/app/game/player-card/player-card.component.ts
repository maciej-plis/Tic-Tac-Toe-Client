import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  @Input() symbol: string;
  @Input() playerName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
