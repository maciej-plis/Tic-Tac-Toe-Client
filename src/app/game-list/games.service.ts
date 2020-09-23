import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../game-api.config';

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
    return this.http.get<GameInfo[]>(API_URL + "games", {withCredentials: true});
  }

  createGame(name: string): Observable<any> {
    return this.http.post(API_URL + "games", {name}, {withCredentials: true});
  }

  removeGame(gameID: string): Observable<any> {
    return this.http.delete(API_URL + `games/${gameID}`, {withCredentials: true});
  }

  joinTheGame(gameID: string): Observable<any> {
    return this.http.post(API_URL + `games/${gameID}/join`, null, {withCredentials: true}).pipe(
      tap(resp => localStorage.setItem("activeGame", gameID))
    );
  }
}
