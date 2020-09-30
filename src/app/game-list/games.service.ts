import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';

export interface GameInfo {
  id: string,
  name: string,
  players: {
    x?: string,
    O?: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(environment.API_URL + "games", {headers: this.authService.getHeaders()});
  }

  createGame(name: string): Observable<any> {
    return this.http.post(environment.API_URL + "games", {name}, {headers: this.authService.getHeaders()});
  }

  removeGame(gameID: string): Observable<any> {
    return this.http.delete(environment.API_URL + `games/${gameID}`, {headers: this.authService.getHeaders()});
  }

  joinTheGame(gameID: string): Observable<any> {
    if(localStorage.getItem("activeGame") == gameID) {
      return of("You already joined this game")
    } 
    
    if(localStorage.getItem("activeGame")) {
      return throwError({error: "You can't join another game before leaving previous"});
    }

    return this.http.post(environment.API_URL + `games/${gameID}/join`, null, {headers: this.authService.getHeaders()}).pipe(
      tap(resp => localStorage.setItem("activeGame", gameID))
    );
  }
}
