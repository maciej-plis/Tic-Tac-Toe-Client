import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game/service/game.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  errorMsg: string;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  join(name: string) {
    this.gameService.join(name).subscribe(resp => {
      if(resp.success == "true") {
        this.router.navigate(['/game']);
      }
  
      this.errorMsg = resp.message;
    });
  }

}
