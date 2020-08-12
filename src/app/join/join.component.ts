import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game/service/game.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  error: string;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  join() {
    this.gameService.join().subscribe(resp => {
      if(resp.success) {
        this.error = null;
        this.router.navigate(['game']);
      } else {
        this.error = resp.message;
      }
    });

  }

}
