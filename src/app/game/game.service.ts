import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { State } from './store/game-data.reducer';
import { WsClientService } from './ws-client.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private wsClient: WsClientService
  ) {
    wsClient.setUrl(environment.API_URL + "tic-tac-toe/");
  }

  subscribeGameEvents(): Observable<any> {
    return this.wsClient.subscribe(`/topic/games/${localStorage.getItem("activeGame")}`);
  }

  getGameData(): Observable<any> {
    return this.http.get<State>(environment.API_URL + `games/${localStorage.getItem("activeGame")}`, {headers: this.authService.getAuthHeaders()});
  }

  mark(x: number, y: number): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/mark`, {x, y}, {headers: this.authService.getAuthHeaders()});
  }

  rematch(): Observable<any>  {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/rematch`, null, {headers: this.authService.getAuthHeaders()});
  }

  join(gameID: string): Observable<any> {
    return this.http.post(environment.API_URL + `games/${gameID}/join`, null, {headers: this.authService.getAuthHeaders()}).pipe(
      tap(resp => localStorage.setItem("activeGame", gameID))
    );
  }

  leave(): Observable<any> {
    this.wsClient.disconnect();

    return this.http.post<{success: boolean, message: string}>(environment.API_URL + `games/${localStorage.getItem("activeGame")}/leave`, null, {headers: this.authService.getAuthHeaders()}).pipe(
      tap(() => localStorage.removeItem("activeGame"))
    );
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post(environment.API_URL + `games/${localStorage.getItem("activeGame")}/send-message`, message, {headers: this.authService.getAuthHeaders()});
  }
}
