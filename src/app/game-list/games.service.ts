import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/authentication.service';

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
    return this.http.get<GameInfo[]>(environment.API_URL + "games", {headers: this.authService.getAuthHeaders()});
  }
}
