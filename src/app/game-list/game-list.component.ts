import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { GameInfo, GamesService } from './games.service';
import { SortingMethods } from './games-sorting.pipe';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private allGames: GameInfo[] = [];
  sortingMethods = Object.keys(SortingMethods);

  activeMethod: string = this.sortingMethods[0];
  filteredGames: GameInfo[] = [];

  constructor(
    private authService: AuthenticationService,
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.gamesService.getGames().subscribe(resp => {
      this.allGames = resp;
      this.filteredGames = resp;
    });
  }

  filterGames(keyword: string) {
    this.filteredGames = Object.assign([], this.allGames).filter(
      game => game.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
  }

  applySorting(method: string) {
    this.activeMethod = method;
  }

  joinGame(gameID: string) {
    this.gamesService.joinTheGame(gameID).subscribe(
      resp => {
        this.router.navigate(["game"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  formatSortingMethodName(name: string) {
    let capitalize: boolean = true;
    let formattedName = "";

    for(let letter of [...name]) {
      if(letter == "_") {
        formattedName += " ";
        capitalize = true;
      } else if(capitalize) {
        formattedName += letter.toUpperCase();
        capitalize = false;
      } else {
        formattedName += letter.toLowerCase();
      }
    }

    return formattedName;
  }

}
