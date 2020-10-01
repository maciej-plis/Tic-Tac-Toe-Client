import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';
import { State } from './store/game-data.reducer';
import { WSClient } from './WS_client';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  wsClient: WSClient;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.wsClient = new WSClient(environment.API_URL + "tic-tac-toe/");
  }

  subscribeGameEvents(): Observable<any> {
    return this.wsClient.subscribe(`/topic/games/${localStorage.getItem("activeGame")}`);
  }

  getGameData(): Observable<any> {
    return this.http.get<State>(environment.API_URL + `games/${localStorage.getItem("activeGame")}`, {headers: this.authService.getHeaders()});
  }

  mark(x: number, y: number): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/mark`, {x, y}, {headers: this.authService.getHeaders()});
  }

  rematch(): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/rematch`, null, {headers: this.authService.getHeaders()});
  }

  join(gameID: string): Observable<any> {
    return this.http.post(environment.API_URL + `games/${gameID}/join`, null, {headers: this.authService.getHeaders()}).pipe(
      tap(resp => localStorage.setItem("activeGame", gameID))
    );
  }

  leave(): Observable<any> {
    return this.http.post<{success: boolean, message: string}>(environment.API_URL + `games/${localStorage.getItem("activeGame")}/leave`, null, {headers: this.authService.getHeaders()}).pipe(
      tap(() => localStorage.removeItem("activeGame"))
    );
  }
}
