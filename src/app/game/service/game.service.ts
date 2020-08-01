import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadGame, setTile } from '../store/game.actions';
import { state } from '../store/game.reducer';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(
    private http: HttpClient,
  ) {}

  join(name: string): Observable<any> {
    return this.http.post('http://localhost:8080/join', name);
  }

  leave(): void {
    this.http.post("http://localhost:8080/leave", {}).subscribe(resp => {
      console.log(resp);
    });
  }

}
