import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    private http: HttpClient
  ) { }

  getGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(environment.API_URL + "games", {withCredentials: true});
  }

  createGame(name: string): Observable<any> {
    return this.http.post(environment.API_URL + "games", {name}, {withCredentials: true});
  }

  removeGame(gameID: string): Observable<any> {
    return this.http.delete(environment.API_URL + `games/${gameID}`, {withCredentials: true});
  }

  joinTheGame(gameID: string): Observable<any> {
    if(localStorage.getItem("activeGame") == gameID) {
      return of("You already joined this game")
    } 
    
    if(localStorage.getItem("activeGame")) {
      return throwError({error: "You can't join another game before leaving previous"});
    }

    return this.http.post(environment.API_URL + `games/${gameID}/join`, null, {withCredentials: true}).pipe(
      tap(resp => localStorage.setItem("activeGame", gameID))
    );
  }
}
