import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { State } from './store/game-data.reducer';
import { WSClient } from './WS_client';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  wsClient: WSClient;

  constructor(
    private http: HttpClient
  ) {
    this.wsClient = new WSClient(environment.API_URL + "tic-tac-toe/");
  }

  subscribeGameEvents(): Observable<any> {
    return this.wsClient.subscribe(`/topic/games/${localStorage.getItem("activeGame")}`);
  }

  getGameData(): Observable<any> {
    return this.http.get<State>(environment.API_URL + `games/${localStorage.getItem("activeGame")}`, {withCredentials: true});
  }

  mark(x: number, y: number): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/mark`, {x, y}, {withCredentials: true});
  }

  rematch(): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/rematch`, null, {withCredentials: true});
  }

  leave(): Observable<any> {
    return this.http.post<{success: boolean, message: string}>(environment.API_URL + `games/${localStorage.getItem("activeGame")}/leave`, null, {withCredentials: true}).pipe(
      tap(() => localStorage.removeItem("activeGame"))
    );
  }
}
